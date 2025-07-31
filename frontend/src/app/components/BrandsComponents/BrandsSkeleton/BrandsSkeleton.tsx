import React from "react";

// Individual Brand Card Skeleton that matches TypeCard structure
const BrandCardSkeleton = () => {
  return (
    <div className="block w-full rounded-md p-[8px] md:p-[16px] border-[2px] border-gray-200/20">
      {/* Image Skeleton with shimmer animation */}
      <div className="relative w-full aspect-square rounded-md bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Text Skeleton */}
      <div className="pt-[8px] md:pt-[12px]">
        <div className="h-[18px] w-3/4 mx-auto bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

// Page-level skeleton for full page loading
const BrandsSkeleton = () => {
  return (
    <div className="md:pt-[80px] pt-[58px] overflow-hidden">
      {/* Header Skeleton */}
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <div className="h-6 w-3/4 md:w-1/3 md:mx-auto bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="h-4 w-1/2 md:w-1/4 md:mx-auto bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>

      <div className="px-[3%]">
        {/* Search Bar Skeleton */}
        <div className="my-[12px]">
          <div className="h-12 w-full md:w-[400px] bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Brand Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[12px]">
          {[...Array(12)].map((_, i) => (
            <BrandCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsSkeleton;
export { BrandCardSkeleton };
