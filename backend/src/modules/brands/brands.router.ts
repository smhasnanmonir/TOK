import { Hono } from "hono";
import { brandController } from "./brands.controller";
import { D1Database } from "@cloudflare/workers-types";

// Router (auth-router.ts)
export const brandRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

brandRouter.get("/fetch", brandController.brandFetchController);
brandRouter.post("/post", brandController.brandPostController);
