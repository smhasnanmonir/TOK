/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { ShoppingBagIcon } from "lucide-react";
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
          <div
            key={brand.name}
            className="overflow-hidden cursor-pointer relative group transition-all duration-500 ease-in-out transform origin-center hover:border-pink-200"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="transition-all duration-500 ease-in-out transform origin-center block group-hover:grayscale-50"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 duration-500 ease-in-out bg-opacity-50 group-hover:bg-[#FFD3D3] transform origin-center">
              <ShoppingBagIcon size={24} color="#FB6F92" />
              <h1 className="block pl-2 underline decoration-2 decoration-pink-600 underline-offset-[10px] text-black">
                Shop {brand.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByTopBrand;
