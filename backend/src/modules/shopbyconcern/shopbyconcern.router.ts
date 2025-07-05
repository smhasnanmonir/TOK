import { Hono } from "hono";
import { shopByConcernController } from "./shopbyconcern.controller";
import { D1Database } from "@cloudflare/workers-types";

// Router (auth-router.ts)
export const shopByConcernRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

shopByConcernRouter.get(
  "/fetch",
  shopByConcernController.shopByConcernFetchController
);

shopByConcernRouter.post(
  "/post",
  shopByConcernController.shopByConcernPostController
);
