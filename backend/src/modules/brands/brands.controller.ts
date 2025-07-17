import { Context } from "hono";
import { brandService } from "./brands.services";

const brandFetchController = async (c: Context) => {
  const result = await brandService.brandFetchService(c.env.DB);
  return c.json({
    message: "shop by Concern fetched",
    result: result,
  });
};

const brandPostController = async (c: Context) => {
  const { name, slug, img } = await c.req.json();
  try {
    const result = await brandService.brandPostService(c.env.DB, {
      name,
      slug,
      img,
    });
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

export const brandController = {
  brandFetchController,
  brandPostController,
};
