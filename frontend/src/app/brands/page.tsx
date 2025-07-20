import { Suspense } from "react";
import SearchBrands from "../components/BrandsComponents/SearchBrands/SearchBrands";
import TypeCard from "../components/shared/Cards/TypeCard";

const page = async () => {
  // Fetch brands independently
  const data = await fetch("https://backend.tokbd.shop/api/brands/fetch", {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const brands = await data.json();

  // Resolve searchParams separately

  type brandType = {
    id: number;
    name: string;
    slug: string;
    img: string;
  };

  // Filter brands based on search parameter
  const filteredBrands = brands.result;
  // const params = await searchParams;
  // if (params?.search) {
  //   const searchTerm = params.search.toLowerCase().trim();
  //   filteredBrands = brands.result.filter((brand: brandType) =>
  //     brand.name.toLowerCase().includes(searchTerm)
  //   );
  // }

  return (
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
            <Suspense
              fallback={
                <div className="grid place-items-center">Loading search..</div>
              }
            >
              <div className="flex flex-col space-y-[12px]">
                <SearchBrands />
              </div>
            </Suspense>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="grid place-items-center">Loading brands..</div>
          }
        >
          <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-[12px]">
            {filteredBrands.map((brand: brandType) => (
              <TypeCard key={brand?.slug} props={brand}></TypeCard>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
