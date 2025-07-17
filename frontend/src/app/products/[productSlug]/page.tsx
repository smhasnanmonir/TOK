import ProductTabs from "@/app/components/ProductComponents/ProductTabs";
import AddToCartButton from "@/app/components/shared/Button/AddToCartButton";
import BuyNowButton from "@/app/components/shared/Button/BuyNowButton";

/* eslint-disable @next/next/no-img-element */

export const revalidate = 3600;

export async function generateStaticParams() {
  const res = await fetch("https://backend.tokbd.shop/api/products/fetch");
  const data = await res.json();
  type Product = { slug: string };
  return (
    (data?.result as Product[] | undefined)?.map((product) => ({
      productSlug: product.slug,
    })) || []
  );
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const { productSlug } = await params;

  // Example: Fetch product details using the slug
  let product = null;
  try {
    const response = await fetch(
      `https://backend.tokbd.shop/api/products/fetch/${productSlug}`
    );
    if (!response.ok) throw new Error("Failed to fetch product");
    product = await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Error: Product not found</div>;
  }

  const parsedSizeArray: number[] = JSON.parse(product?.result?.details?.sizes);
  const skinConcernArray: string[] = product?.result?.skin_concern.split(",");

  return (
    <div className="md:pt-[96px] pt-[54px] max-w-7xl mx-auto overflow-hidden md:px-0">
      <div className="mx-auto md:px-0 px-[2%] grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        <div className="h-full flex justify-center items-center">
          <img
            className="w-full h-full object-cover rounded-md"
            src={product?.result?.img}
            alt={product?.result?.name}
          />
        </div>
        <div className="flex flex-col flex-1 h-full px-2 sm:px-4 md:px-0">
          <div className="flex-1 flex flex-col space-y-[16px] sm:space-y-[20px] md:space-y-[24px]">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
              {product?.result?.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#DE3163] font-semibold">
              ৳ {product?.result?.price}{" "}
              <span className="line-through text-gray-400 text-xs sm:text-sm">
                {Number(product?.result?.price) + 200}{" "}
              </span>
            </p>
            <h1 className="text-[15px] sm:text-[16px] md:text-[17px]">
              <span className="font-semibold">Brand : </span>
              <span className="font-extrabold">{product?.result?.brand}</span>
            </h1>
            <h1 className="text-[14px] sm:text-[15px] md:text-[16px] text-gray w-full sm:w-3/4">
              {product?.result?.details?.description}
            </h1>
            <h1 className={`text-[15px] sm:text-[16px] md:text-[17px] $`}>
              <span className="font-semibold">Status: </span>{" "}
              <span
                className={` ${
                  product?.result?.stock ? "text-green-400" : "text-red-400"
                }`}
              >
                {product?.result?.stock ? "In Stock" : "Out of Stock"}
              </span>
            </h1>
            <div className="flex flex-wrap gap-2">
              {skinConcernArray?.map((concern: string) => (
                <button
                  className="font-semibold text-center text-xs sm:text-sm px-[10px] sm:px-[12px] py-[4px] border border-gray-200"
                  key={concern}
                >
                  {concern}
                </button>
              ))}
            </div>
            <h1>
              <span className="font-semibold text-[15px] sm:text-[17px]">
                Skin Type :{" "}
              </span>
              <span className="">{product?.result?.skin_type}</span>
            </h1>
            <div className="w-full h-[0.5px] bg-gray-200"></div>
            <div className="flex flex-wrap gap-2">
              {parsedSizeArray?.map((size: number) => (
                <button
                  className=" cursor-pointer font-semibold text-center text-base sm:text-xl px-[14px] sm:px-[18px] py-[4px] border border-gray-200"
                  key={size}
                >
                  {size} ml
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-1/2 mt-4">
            <AddToCartButton></AddToCartButton>
            <BuyNowButton></BuyNowButton>
          </div>
        </div>
      </div>
      <div className="my-[24px] w-full grid px-2 sm:px-4 md:px-0">
        <ProductTabs product={product}></ProductTabs>
      </div>
      <div className="w-full h-[1px] bg-gray-200"></div>
    </div>
  );
};

export default ProductDetails;
