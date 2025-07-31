import { Suspense, use } from "react";
import TypeCard from "../../shared/Cards/TypeCard";
import { BrandCardSkeleton } from "../BrandsSkeleton/BrandsSkeleton";

type BrandType = {
  id: number;
  name: string;
  slug: string;
  img: string;
};

// Component that handles the promise-based streaming
const StreamingBrandCard = ({
  brandPromise,
}: {
  brandPromise: Promise<BrandType>;
}) => {
  const brand = use(brandPromise);
  return (
    <TypeCard url={`/brands/${brand.slug}`} key={brand.slug} props={brand} />
  );
};

const BrandList = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const [dataResponse, resolvedSearchParams] = await Promise.all([
    fetch("https://backend.tokbd.shop/api/brands/fetch", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }),
    searchParams,
  ]);

  if (!dataResponse.ok) {
    throw new Error("Failed to fetch brands");
  }

  const brandsData = await dataResponse.json();

  let filteredBrands: BrandType[] = [...brandsData.result];
  const query = resolvedSearchParams?.query || "";

  if (query) {
    const searchTerm = query.toLowerCase().trim();
    filteredBrands = brandsData.result.filter((brand: BrandType) =>
      brand.name.toLowerCase().includes(searchTerm)
    );
  }

  // Create promises for streaming - each brand can load independently
  const brandPromises = filteredBrands.map((brand) => {
    // Option 1: Use real individual API calls for true streaming
    // return fetchBrandData(brand.id).catch(() => brand);

    // Option 2: Use existing data immediately (no artificial delays)
    return Promise.resolve(brand);
  });

  return (
    <>
      <div>
        {filteredBrands.length === 0 ? (
          <>
            <h1>No brands found</h1>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[12px]">
              {brandPromises.map((brandPromise, index) => (
                <Suspense key={index} fallback={<BrandCardSkeleton />}>
                  <StreamingBrandCard brandPromise={brandPromise} />
                </Suspense>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BrandList;
