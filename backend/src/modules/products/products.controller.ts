import { Context } from "hono";
import { productsService } from "./products.services";

const productsFetchController = async (c: Context) => {
  const result = await productsService.productsFetchService(c.env.DB);
  return c.json({
    message: "Products fetched",
    result: result,
  });
};
const singleProductFetchController = async (c: Context) => {
  const slug = c.req.param("slug");
  const result = await productsService.singleProductFetchService(
    c.env.DB,
    slug
  );
  return c.json({
    message: "Product fetched",
    result: result,
  });
};

const productsPostController = async (c: Context) => {
  //   console.log("Router hit!!!");
  const { products, productDetails } = await c.req.json();
  //   console.log(products, productDetails);
  try {
    const result = await productsService.productsPostService(
      c.env.DB,
      products,
      productDetails
    );
    return c.json({
      success: true,
      message: "Product Posted!",
      result: {
        "Product Result": result.productResult,
        "Product Details Result": result.detailResult.success,
      },
    });
  } catch (error: any) {
    return c.json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const productsController = {
  productsFetchController,
  productsPostController,
  singleProductFetchController,
};
