import { Hono } from "hono";
import { shopByCategoryController } from "./sbc.controller";

// Router (auth-router.ts)
export const shopByCategoryRouter = new Hono<{
  Bindings: {
    DB: D1Database;
    JWT_SECRET: string;
  };
}>();

shopByCategoryRouter.get(
  "/fetch",
  shopByCategoryController.shopByCategoryFetchController
);
