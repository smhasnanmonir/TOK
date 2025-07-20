// app/brands/loading.tsx
// This provides route-level loading UI while the page component loads

const Loading = () => {
  return (
    <div className="md:pt-[80px] pt-[58px] overflow-hidden">
      {/* Header loads immediately */}
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <h1 className="md:text-center md:text-2xl font-semibold">
          TOK offers products from top Korean brands
        </h1>
        <p className="md:text-center md:text-xl text-sm text-gray-500">
          Straightly for Korea! Buy with confidence.
        </p>
      </div>

      <div className="px-[3%]">
        {/* Search skeleton */}
        <div className="my-[12px]">
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-12 md:w-[400px] w-full mb-3"></div>
            <div className="bg-gray-200 rounded-md h-12 w-24"></div>
          </div>
        </div>

        {/* Brands skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[12px]">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg p-4 h-32 flex flex-col justify-between"
            >
              <div className="bg-gray-300 rounded h-16 w-full mb-2"></div>
              <div className="space-y-2">
                <div className="bg-gray-300 rounded h-3 w-3/4"></div>
                <div className="bg-gray-300 rounded h-3 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
