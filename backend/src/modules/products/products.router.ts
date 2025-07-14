import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";
import { productsController } from "./products.controller";

// Router (auth-router.ts)
export const productsRouter = new Hono<{
  Bindings: {
    DB: D1Database;
  };
}>();

productsRouter.get("/fetch", productsController.productsFetchController);
productsRouter.post("/post", productsController.productsPostController);
productsRouter.get(
  "/fetch/:slug",
  productsController.singleProductFetchController
);

productsRouter.get(
  "/search/:name",
  productsController.singleProductFetchController
);
