import SearchBrands from "../components/BrandsComponents/SearchBrands/SearchBrands";
import BrandList from "../components/BrandsComponents/BrandList/BrandList";
import { Suspense } from "react";

const BrandsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  return (
    <div className="md:pt-[80px] pt-[58px] overflow-hidden">
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <h1 className="md:text-center md:text-2xl font-semibold">
          TOK offers products from top Korean brands
        </h1>
        <p className="md:text-center md:text-xl text-sm text-gray-500">
          Straightly for Korea! Buy with confidence.
        </p>
      </div>
      <div className="px-[3%]">
        <div className="my-[12px]">
          <SearchBrands />
        </div>
        <Suspense
          fallback={
            <div className="grid place-items-center h-screen">
              Loading brands...
            </div>
          }
        >
          <BrandList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default BrandsPage;
