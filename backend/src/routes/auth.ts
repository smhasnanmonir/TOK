import { Hono } from "hono";
import { createDB } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { sign, verify } from "hono/jwt";

const auth = new Hono<{
  Bindings: {
    DB: D1Database;
    JWT_SECRET: string;
  };
}>();

// Register new user
auth.post("/register", async (c) => {
  try {
    const { email, name, password } = await c.req.json();

    if (!email || !name || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const db = createDB(c.env.DB);

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser.length > 0) {
      return c.json({ error: "User already exists" }, 409);
    }

    // Hash password (in production, use bcrypt or similar)
    const passwordHash = await crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(password))
      .then((hash) =>
        Array.from(new Uint8Array(hash))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
      );

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        email,
        name,
        passwordHash,
      })
      .returning();

    // Generate JWT token
    const token = await sign({ userId: newUser[0].id }, c.env.JWT_SECRET);

    return c.json(
      {
        message: "User created successfully",
        user: {
          id: newUser[0].id,
          email: newUser[0].email,
          name: newUser[0].name,
        },
        token,
      },
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Login user
auth.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const db = createDB(c.env.DB);

    // Find user
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Hash password for comparison
    const passwordHash = await crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(password))
      .then((hash) =>
        Array.from(new Uint8Array(hash))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
      );

    if (user[0].passwordHash !== passwordHash) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Generate JWT token
    const token = await sign({ userId: user[0].id }, c.env.JWT_SECRET);

    return c.json({
      message: "Login successful",
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get current user
auth.get("/me", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "No token provided" }, 401);
    }

    const token = authHeader.substring(7);
    const payload = await verify(token, c.env.JWT_SECRET);

    const db = createDB(c.env.DB);
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId as string));

    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return c.json({ error: "Invalid token" }, 401);
  }
});

export default auth;
