import { Hono } from "hono";
import { shopByCategoryController } from "./shopbycate.controller";
import { D1Database } from "@cloudflare/workers-types";

// Router (auth-router.ts)
export const shopByCategoryRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

shopByCategoryRouter.get(
  "/fetch",
  shopByCategoryController.shopByCategoryFetchController
);

shopByCategoryRouter.post(
  "/post",
  shopByCategoryController.shopByCategoryPostController
);
