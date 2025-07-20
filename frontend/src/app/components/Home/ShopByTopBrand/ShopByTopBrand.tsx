/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import Card from "../../shared/Cards/TypeCard";
import ShopBy from "../../shared/ShopBy/ShopBy";

const ShopByTopBrand = async () => {
  const data = await fetch("https://backend.tokbd.shop/api/brands/fetch", {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const brandLogos = await data.json();
  return (
    <div className="px-[24px]">
      <ShopBy title="Shop By Brand"></ShopBy>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {brandLogos.result?.slice(0, 8).map((brand: any) => (
          <Card url="/" props={brand} key={brand?.id}></Card>
        ))}
      </div>
    </div>
  );
};

export default ShopByTopBrand;
