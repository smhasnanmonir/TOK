import { Hono } from "hono";
import { shopByTypeController } from "./shopbytype.controller";
import { D1Database } from "@cloudflare/workers-types";

// Router (auth-router.ts)
export const shopByTypeRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

shopByTypeRouter.get("/fetch", shopByTypeController.shopByTypeFetchController);

shopByTypeRouter.post("/post", shopByTypeController.shopByTypePostController);
