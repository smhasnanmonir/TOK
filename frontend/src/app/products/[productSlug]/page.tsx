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

  return (
    <div className="mx-auto max-w-7xl pt-[60px] px-[4%]">
      <h1>Product Details</h1>
      <h2>{product?.result?.name || productSlug}</h2>
      <p>
        {product?.result?.details?.description || "No description available"}
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-[400px] mx-auto pt-[20px]">
        <img
          src={product?.result?.img}
          alt={product?.result?.name}
          className="w-[150px] h-full object-cover rounded-md "
        />
        <img
          src={product?.result?.card_photo}
          alt={product?.result?.name}
          className="w-[150px] h-full object-cover rounded-md "
        />
      </div>
    </div>
  );
};

export default ProductDetails;
