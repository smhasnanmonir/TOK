import { Context } from "hono";
import { shopByCategoryService } from "./sbc.services";

const shopByCategoryFetchController = async (c: Context) => {
  const result = await shopByCategoryService.shopByCategoryFetchService();
  return c.json({
    message: "shop by category created",
    result: result,
  });
};

export const shopByCategoryController = {
  shopByCategoryFetchController,
};
