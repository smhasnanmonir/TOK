import TypeCard from "../../shared/Cards/TypeCard";
import { use } from "react";

type BrandType = {
  id: number;
  name: string;
  slug: string;
  img: string;
  createdAt: string;
};

async function fetchBrands() {
  const res = await fetch("https://backend.tokbd.shop/api/brands/fetch", {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  return res.json();
}

export async function generateStaticParams() {
  try {
    const data = await fetchBrands(); // Reuse the fetch function

    return (
      (data?.result as BrandType[] | undefined)?.map((brand) => ({
        brandSlug: brand.slug,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching brands for static params:", error);
    return [];
  }
}

const BrandList = ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  // Use React.use to unwrap the searchParams promise
  const resolvedSearchParams = use(searchParams);

  // Use React.use to unwrap the data fetch promise
  const brandsData = use(fetchBrands());

  // Process data
  let filteredBrands: BrandType[] = [...brandsData.result];
  const query = resolvedSearchParams?.query || "";

  if (query) {
    const searchTerm = query.toLowerCase().trim();
    filteredBrands = brandsData.result.filter((brand: BrandType) =>
      brand.name.toLowerCase().includes(searchTerm)
    );
  }

  return (
    <div>
      {filteredBrands.length === 0 ? (
        <h1>No brands found</h1>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[12px]">
          {filteredBrands.map((brand) => (
            <TypeCard
              key={brand.id}
              url={`/brands/${brand.slug}`}
              props={brand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandList;
