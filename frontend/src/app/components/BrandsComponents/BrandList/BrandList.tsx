// components/BrandsComponents/BrandList.tsx
import { Suspense } from "react";
import TypeCard from "../../shared/Cards/TypeCard";

type BrandType = {
  id: number;
  name: string;
  slug: string;
  img: string;
};

const BrandList = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const [dataResponse, resolvedSearchParams] = await Promise.all([
    fetch("https://backend.tokbd.shop/api/brands/fetch ", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),
    searchParams,
  ]);

  const brandsData = await dataResponse.json();
  const query = resolvedSearchParams?.query || "";

  let filteredBrands = brandsData.result;

  if (query) {
    const searchTerm = query.toLowerCase().trim();
    filteredBrands = brandsData.result.filter((brand: BrandType) =>
      brand.name.toLowerCase().includes(searchTerm)
    );
  }

  return (
    <Suspense
      fallback={<div className="grid place-items-center">Loading brands..</div>}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[12px]">
        {filteredBrands.map((brand: BrandType) => (
          <TypeCard key={brand?.slug} props={brand} />
        ))}
      </div>
    </Suspense>
  );
};

export default BrandList;
