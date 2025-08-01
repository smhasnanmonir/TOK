/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/app/components/shared/Cards/ProductCard";
import { Suspense, use } from "react";

export type ProductType = {
  id: number;
  name: string;
  slug: string;
  img: string;
  card_photo: string;
  price: string;
  skin_type: string;
  skin_concern: string;
  brand: string;
  category: string;
  stock: boolean;
  page: number;
  pageSize: number;
};

// Async function to fetch products by brand
async function getBrandProducts(brand: string) {
  const res = await fetch(
    `https://backend.tokbd.shop/api/products/search/brand/${brand}`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch brand products");
  }

  return res.json();
}

const BrandPage = ({ params }: { params: Promise<{ brand: string }> }) => {
  // Unwrap params using React.use()
  const { brand } = use(params);

  // Fetch product data using React.use()
  const brandWiseProductData = use(getBrandProducts(brand));

  return (
    <div
      className="md:py-[80px] py-[55px]"
      style={{ viewTransitionName: "brand-detail-page" }}
    >
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
            <Suspense
              key={product.id}
              fallback={
                <div className="grid place-items-center">Loading...</div>
              }
            >
              <ProductCard
                name={product.name}
                price={product.price}
                slug={product.slug}
                img={product.img}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
