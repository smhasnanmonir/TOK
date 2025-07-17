import { Context } from "hono";
import { userService } from "./auth.services";

export const userRegisterController = async (
  c: Context<{
    Bindings: {
      DB: D1Database;
      JWT_SECRET: string;
    };
  }>
) => {
  try {
    const { email, name, password, role } = await c.req.json();

    if (!email || !name || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const result = await userService.userRegisterService(
      c.env.DB,
      c.env.JWT_SECRET,
      {
        email,
        name,
        password,
        role: "user",
      }
    );
    return c.json(
      {
        message: "User created successfully",
        ...result,
      },
      201
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error.message === "User already exists") {
      return c.json({ error: "User already exists" }, 409);
    }
    return c.json({ error: "Internal server error" }, 500);
  }
};
