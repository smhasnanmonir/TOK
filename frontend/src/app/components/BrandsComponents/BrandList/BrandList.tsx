// components/BrandsComponents/BrandList.tsx
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
  // Start fetching data immediately without awaiting searchParams
  const dataPromise = fetch("https://backend.tokbd.shop/api/brands/fetch", {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  // Await searchParams and data in parallel
  const [dataResponse, resolvedSearchParams] = await Promise.all([
    dataPromise,
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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[12px]">
      {filteredBrands.map((brand: BrandType) => (
        <TypeCard url="" key={brand?.slug} props={brand} />
      ))}
    </div>
  );
};

export default BrandList;
