import Card from "../../shared/Card/Card";
import ShopBy from "../../shared/ShopBy/ShopBy";

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
      <ShopBy title="Shop By Category"></ShopBy>
      <div className="grid md:grid-cols-8 grid-cols-2 place-items-center gap-[16px] ">
        {categories?.result.map(
          (category: { id: number; name: string; img: string }) => (
            <Card props={category} key={category.id}></Card>
          )
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
