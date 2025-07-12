import { Context } from "hono";
import { shopByTypeService } from "./shopbytype.services";

const shopByTypeFetchController = async (c: Context) => {
  const result = await shopByTypeService.shopByTypeFetchService(c.env.DB);
  return c.json({
    message: "shop by Type fetched",
    result: result,
  });
};

const shopByTypePostController = async (c: Context) => {
  const { name, slug, img } = await c.req.json();
  try {
    const result = await shopByTypeService.shopByTypePostService(c.env.DB, {
      name,
      slug,
      img,
    });
    return c.json({
      message: "shop by Type Posted!",
      result: result,
    });
  } catch (error) {
    return c.json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const shopByTypeController = {
  shopByTypeFetchController,
  shopByTypePostController,
};
