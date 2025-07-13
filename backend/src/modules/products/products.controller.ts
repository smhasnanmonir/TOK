import { Context } from "hono";
import { productsService } from "./products.services";

const productsFetchController = async (c: Context) => {
  const result = await productsService.productsFetchService(c.env.DB);
  return c.json({
    message: "Products fetched",
    result: result,
  });
};

const productsPostController = async (c: Context) => {
  const { productProps, detailProps } = await c.req.json();
  try {
    const result = await productsService.productsPostService(
      c.env.DB,
      productProps,
      detailProps
    );
    return c.json({
      message: "Product Posted!",
      result: result,
    });
  } catch (error) {
    return c.json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const productsController = {
  productsFetchController,
  productsPostController,
};
