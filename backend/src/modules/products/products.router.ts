import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

// Router (auth-router.ts)
export const productsRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();
