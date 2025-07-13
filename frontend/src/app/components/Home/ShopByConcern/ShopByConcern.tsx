import Card from "../../shared/Card/Card";
import ShopBy from "../../shared/ShopBy/ShopBy";

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
    <div className="w-full ">
      <ShopBy title="Shop By Concern"></ShopBy>
      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 place-items-center gap-[12px] md:gap-[16px] px-[12px] md:px-[20px]">
          {concern?.result.map(
            (concern: { id: number; name: string; img: string }) => (
              <Card props={concern} key={concern?.id}></Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopByConcern;
