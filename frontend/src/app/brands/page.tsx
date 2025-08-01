import SearchBrands from "../components/BrandsComponents/SearchBrands/SearchBrands";
import BrandList from "../components/BrandsComponents/BrandList/BrandList";
import { Suspense } from "react";

// Force dynamic rendering to prevent prerender issues
export const dynamic = "force-dynamic";

const BrandsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  return (
    <div
      className="md:pt-[80px] pt-[58px] overflow-hidden"
      style={{ viewTransitionName: "brands-page" }}
    >
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <h1 className="md:text-center md:text-2xl font-semibold">
          TOK offers products from top Korean brands
        </h1>
        <p className="md:text-center md:text-xl text-sm text-gray-500">
          Straightly for Korea! Buy with confidence.
        </p>
      </div>
      <div className="my-[12px] px-[3%]">
        <Suspense
          fallback={
            <div className="w-full flex flex-col space-y-[12px]">
              {/* Search input skeleton */}
              <div className="block md:w-[400px] w-full border border-gray-300 rounded-md p-[12px] bg-gray-200 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>

              {/* Button skeleton */}
              <div className="max-w-fit bg-gray-200 cursor-pointer text-white px-[48px] py-[12px] rounded-md animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          }
        >
          <SearchBrands />
        </Suspense>
      </div>
      <div className="px-[3%]">
        <BrandList searchParams={searchParams} />
      </div>
    </div>
  );
};

export default BrandsPage;
