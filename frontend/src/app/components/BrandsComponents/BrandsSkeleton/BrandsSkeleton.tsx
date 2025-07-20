import React from "react";

const BrandsSkeleton = () => {
  return (
    <div className="md:pt-[80px] pt-[58px] overflow-hidden">
      {/* Header Skeleton */}
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <div className="h-6 w-3/4 md:w-1/3 md:mx-auto bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 md:w-1/4 md:mx-auto bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="px-[3%]">
        {/* Search Bar Skeleton */}
        <div className="my-[12px]">
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Brand List Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSkeleton;
