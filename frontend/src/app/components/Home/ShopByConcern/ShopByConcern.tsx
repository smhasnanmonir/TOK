/* eslint-disable @next/next/no-img-element */
const ShopByConcern = async () => {
  const data = await fetch(
    "https://backend.tokbd.shop/api/shop-by-concern/fetch",
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  );
  const concern = await data.json();

  return (
    <div className="w-full py-[20px]">
      <div className="flex gap-2 items-center justify-center pb-[20px] px-[20px]">
        <div className="w-1/4 h-0.5 bg-gray-200"></div>
        <h1 className="md:text-3xl text-xl font-semibold font-poppins">
          Shop By Concern
        </h1>
        <div className="w-1/4 h-0.5 bg-gray-200"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 place-items-center gap-[12px] md:gap-[16px] px-[12px] md:px-[20px]">
        {concern?.result.map(
          (concern: { id: number; name: string; img: string }) => (
            <div
              className="w-full rounded-md p-[8px] md:p-[16px] cursor-pointer border-[2px] border-gray-200/20 inset-shadow-indigo-500/50 hover:border-pink-200 transition-all duration-300"
              key={concern.id}
            >
              <img
                className="w-full h-auto rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
                src={concern.img}
                alt={concern.name}
              />
              <h1 className="text-center text-[#E30B5D] font-semibold text-[10px] sm:text-[11px] md:text-[12px] pt-[8px] md:pt-[12px] font-poppins">
                {concern.name}
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShopByConcern;
