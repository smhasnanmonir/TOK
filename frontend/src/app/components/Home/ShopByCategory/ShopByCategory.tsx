/* eslint-disable @next/next/no-img-element */
const ShopByCategory = async () => {
  const data = await fetch(
    "https://backend.tokbd.shop/api/shop-by-category/fetch",
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  );
  const categories = await data.json();

  return (
    <div className="mx-auto w-full px-[20px]">
      <div className="flex gap-2 items-center justify-center pb-[20px]">
        <div className="w-1/4 h-0.5 bg-gray-200"></div>
        <h1 className="md:text-3xl text-xl font-semibold">Shop By Category</h1>
        <div className="w-1/4 h-0.5 bg-gray-200"></div>
      </div>
      <div className="grid md:grid-cols-8 grid-cols-2 place-items-center gap-[16px] ">
        {categories?.result.map(
          (category: { id: number; name: string; img: string }) => (
            <div
              className=" rounded-md p-[16px] cursor-pointer border-[2px] border-gray-200/20 inset-shadow-indigo-500/50"
              key={category.id}
            >
              <img
                className="rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
                src={category.img}
                alt={category.name}
              />
              <h1 className="text-center text-[#E30B5D] font-semibold text-[12px] pt-[12px] font-poppins">
                {category.name}
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
