import Card from "../../shared/Cards/TypeCard";
import ShopBy from "../../shared/ShopBy/ShopBy";

/* eslint-disable @next/next/no-img-element */
const ShopByType = async () => {
  const data = await fetch(
    "https://backend.tokbd.shop/api/shop-by-type/fetch",
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  );
  const skin_type = await data.json();

  return (
    <div className="mx-auto w-full ">
      <ShopBy title="Shop By Type"></ShopBy>
      <div className="px-[20px]">
        <div className="grid md:grid-cols-6 grid-cols-2 place-items-center gap-[16px] ">
          {skin_type?.result.map(
            (skin_type: { id: number; name: string; img: string }) => (
              <Card props={skin_type} key={skin_type?.id}></Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopByType;
