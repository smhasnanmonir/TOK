import { Context } from "hono";
import { shopByCategoryService } from "./sbc.services";

const shopByCategoryFetchController = async (
  c: Context<{
    Bindings: {
      DB: D1Database;
    };
  }>
) => {
  const result = await shopByCategoryService.shopByCategoryFetchService(
    c.env.DB
  );
  return c.json({
    message: "shop by category fetched",
    result: result,
  });
};

const shopByCategoryPostController = async (
  c: Context<{
    Bindings: {
      DB: D1Database;
    };
  }>
) => {
  const { name, slug, img } = await c.req.json();
  try {
    const result = await shopByCategoryService.shopByCategoryPostService(
      c.env.DB,
      { name, slug, img }
    );
    return c.json({
      message: "shop by category Posted!",
      result: result,
    });
  } catch (error: any) {
    return c.json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const shopByCategoryController = {
  shopByCategoryFetchController,
  shopByCategoryPostController,
};
