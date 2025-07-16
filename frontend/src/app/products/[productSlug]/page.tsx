// import { ArrowRight } from "lucide-react";

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
  console.log(parsedSizeArray);

  return (
    <div className="md:pt-[96px] pt-[54px] max-w-7xl mx-auto">
      {/* <div className="bg-[#de31629d] p-4 h-[140px] flex items-center">
        <div className="pt-[48px] grid place-items-center w-full">
          <h1 className="text-white text-2xl font-bold">Product Details</h1>
          <div className="flex items-center gap-2 pt-[8px] text-white font-semibold">
            <h1>Home</h1>
            <ArrowRight />
            <h1>Products</h1>
            <ArrowRight />
            <h1>{product?.result?.name}</h1>
          </div>
        </div>
      </div> */}
      <div className="mx-auto px-[4%] grid grid-cols-2 gap-4 justify-start">
        <div>
          <img
            className="w-[550px] h-full object-cover rounded-md"
            src={product?.result?.img}
            alt={product?.result?.name}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold">{product?.result?.name}</h1>
            <p className="text-xl text-[#DE3163] font-semibold">
              ৳ {product?.result?.price}{" "}
              <span className="line-through text-gray-400 text-sm">
                {Number(product?.result?.price) + 200}{" "}
              </span>
            </p>
            <h1 className="text-[18px]">
              {" "}
              <span className="font-semibold">Brand:</span>{" "}
              {product?.result?.brand}
            </h1>
            <h1 className="text-[18px]">
              {" "}
              <span className="font-semibold">Origin: </span>South Korea
            </h1>
            <h1 className="text-[18px]">
              <span className="font-semibold">Category: </span>{" "}
              {product?.result?.category}
            </h1>
            <h1 className={`text-[18px] $`}>
              <span className="font-semibold">Status: </span>{" "}
              <span
                className={
                  product?.result?.stock ? "text-green-400" : "text-red-400"
                }
              >
                {product?.result?.stock ? "In Stock" : "Out of Stock"}
              </span>
            </h1>
          </div>
          <div className="flex flex-col space-y-2">
            <h1>Size/Volume</h1>
            <div className="flex flex-wrap gap-2">
              {parsedSizeArray?.map((size: number) => (
                <button
                  className="bg-[#DE3163] cursor-pointer font-semibold text-center rounded-full text-xl px-[18px] py-[4px] text-white"
                  key={size}
                >
                  {size} ml
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
