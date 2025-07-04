import { eq } from "drizzle-orm";
import { sign, verify } from "hono/jwt";
import { createDB, NewUser, users } from "../../db";

type RegisterInput = {
  email: string;
  name: string;
  password: string;
  role?: string;
};

const userRegisterService = async (
  db: D1Database,
  jwtSecret: string,
  props: RegisterInput
) => {
  try {
    const drizzleDB = createDB(db);

    // Check if user already exists
    const existingUser = await drizzleDB
      .select()
      .from(users)
      .where(eq(users.email, props.email));

    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }

    // Hash password
    const passwordHash = await crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(props.password))
      .then((hash) =>
        Array.from(new Uint8Array(hash))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
      );

    const id = crypto.randomUUID();

    // Create user
    const newUser = await drizzleDB
      .insert(users)
      .values({
        id: id,
        email: props.email,
        name: props.name,
        password: passwordHash,
        role: props.role || "user",
      })
      .returning();

    // Generate tokens
    const accessExp = Math.floor(Date.now() / 1000) + 60 * 15;
    const accessToken = await sign(
      { userId: newUser[0].id, type: "access", exp: accessExp },
      jwtSecret
    );
    const refreshExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const refreshToken = await sign(
      { userId: newUser[0].id, type: "refresh", exp: refreshExp },
      jwtSecret
    );

    return {
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
        role: newUser[0].role,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const userService = {
  userRegisterService,
};
