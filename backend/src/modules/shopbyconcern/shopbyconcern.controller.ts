import { Context } from "hono";
import { shopByConcernService } from "./shopbyconcern.services";

const shopByConcernFetchController = async (c: Context) => {
  const result = await shopByConcernService.shopByConcernFetchService(c.env.DB);
  return c.json({
    message: "shop by Concern fetched",
    result: result,
  });
};

const shopByConcernPostController = async (c: Context) => {
  const { name, slug, img } = await c.req.json();
  try {
    const result = await shopByConcernService.shopByConcernPostService(
      c.env.DB,
      { name, slug, img }
    );
    return c.json({
      message: "shop by Concern Posted!",
      result: result,
    });
  } catch (error) {
    return c.json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const shopByConcernController = {
  shopByConcernFetchController,
  shopByConcernPostController,
};
