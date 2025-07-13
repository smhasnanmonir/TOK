import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { authRouter } from "./modules/auth/auth.router";
import { shopByCategoryRouter } from "./modules/shopbycategory/shopbycate.router";
import { shopByConcernRouter } from "./modules/shopbyconcern/shopbyconcern.router";
import { shopByTypeRouter } from "./modules/shopbytype/shopbytype.router";
import { productsRouter } from "./modules/products/products.router";

const app = new Hono<{
  Bindings: {
    DB: D1Database;
    JWT_SECRET: string;
  };
}>();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:8787",
      "https://tok-backend.qbb5st7w6.workers.dev",
      "https://backend.tokbd.shop",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Health check
app.get("/", (c) => {
  return c.json({
    message: "TOK Backend API",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.route("/api/auth", authRouter);
app.route("/api/shop-by-category", shopByCategoryRouter);
app.route("/api/shop-by-concern", shopByConcernRouter);
app.route("/api/shop-by-type", shopByTypeRouter);
app.route("/api/products", productsRouter);

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      error: "Not Found",
      message: "The requested resource was not found",
      path: c.req.path,
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  console.error("Application error:", err);
  return c.json(
    {
      error: err.message,
      message: "Something went wrong on our end",
    },
    500
  );
});

export default app;
