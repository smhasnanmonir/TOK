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

  //   console.log(filteredBrands);

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
              {filteredBrands.map((brand) => (
                <TypeCard
                  url={`/brands/${brand.slug}`}
                  key={brand.slug}
                  props={brand}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BrandList;
