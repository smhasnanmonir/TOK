import { Suspense } from "react";
import SearchBrands from "../components/BrandsComponents/SearchBrands/SearchBrands";
import TypeCard from "../components/shared/Cards/TypeCard";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const params = await searchParams;
  const data = await fetch("https://backend.tokbd.shop/api/brands/fetch", {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const brands = await data.json();
  type brandType = {
    id: number;
    name: string;
    slug: string;
    img: string;
  };

  // Filter brands based on search parameter
  const searchTerm = params.search?.toLowerCase().trim();
  const filteredBrands = searchTerm
    ? brands.result.filter((brand: brandType) =>
        brand.name.toLowerCase().includes(searchTerm)
      )
    : brands.result;

  return (
    <Suspense
      fallback={
        <div className="grid place-content-center h-screen">
          <div>Loading...</div>
        </div>
      }
    >
      <div className="md:pt-[80px] pt-[58px] ">
        <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
          <h1 className="md:text-center md:text-2xl font-semibold">
            TOK offers products from top Korean brands
          </h1>
          <p className="md:text-center md:text-xl text-sm text-gray-500">
            Straightly for Korea! Buy with confidence.
          </p>
        </div>
        <div className="px-[3%]">
          <div>
            <div className="my-[12px]">
              <div className="flex flex-col space-y-[12px]">
                <SearchBrands />
              </div>
            </div>
          </div>
          <Suspense
            fallback={<div className="grid place-items-center">Loading...</div>}
          >
            <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-[12px]">
              {filteredBrands.map((brand: brandType) => (
                <TypeCard key={brand?.slug} props={brand}></TypeCard>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
