import { Hono } from "hono";
import { userRegisterController } from "./auth.controller";

// Router (auth-router.ts)
export const authRouter = new Hono<{
  Bindings: {
    DB: D1Database;
    JWT_SECRET: string;
  };
}>();

authRouter.post("/register", userRegisterController);
