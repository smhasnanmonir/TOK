/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/app/components/shared/Cards/ProductCard";

const page = async ({ params }: { params: Promise<{ brand: string }> }) => {
  const { brand } = await params;

  const brandWiseProduct = await fetch(
    `https://backend.tokbd.shop/api/products/search/brand/${brand}`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );

  const brandWiseProductData = await brandWiseProduct.json();

  console.log(brandWiseProductData);
  return (
    <div className="md:py-[80px] py-[55px]">
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <h1 className="md:text-center md:text-2xl font-semibold">
          {brand.toUpperCase()} Price in Bangladesh
        </h1>
        <p className="md:text-center md:text-xl text-sm text-gray-500">
          Straightly for Korea! Buy with confidence.
        </p>
      </div>
      <div className="px-[3%] md:py-[24px] py-[12px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px]">
          {brandWiseProductData.result.map((product: any) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              slug={product.slug}
              img={product.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
