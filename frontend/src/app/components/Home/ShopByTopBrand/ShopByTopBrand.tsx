/* eslint-disable @next/next/no-img-element */
import medicube from "../../../asset/TopBrandLogo/Medicube.jpg";
import anua from "../../../asset/TopBrandLogo/Anua.jpg";
import skin1004 from "../../../asset/TopBrandLogo/Skin1004.jpg";
import beauty_of_joseon from "../../../asset/TopBrandLogo/Beauty of joseon.jpg";
import cosrx from "../../../asset/TopBrandLogo/COSRX.jpg";
import missha from "../../../asset/TopBrandLogo/MISSHA.jpg";
import mixsoon from "../../../asset/TopBrandLogo/Mixsoon.jpg";
import purito from "../../../asset/TopBrandLogo/Purito.jpg";
import { ShoppingBagIcon } from "lucide-react";

const ShopByTopBrand = () => {
  const brandLogos = [
    { name: "Skin1004", src: skin1004 },
    { name: "Medicube", src: medicube },
    { name: "Anua", src: anua },
    { name: "Beauty of Joseon", src: beauty_of_joseon },
    { name: "COSRX", src: cosrx },
    { name: "Missha", src: missha },
    { name: "Mixsoon", src: mixsoon },
    { name: "Purito", src: purito },
  ];

  return (
    <div className="pb-[40px] px-[24px]">
      <div className=" flex gap-2 items-center justify-center">
        <div className="w-1/4 h-0.5 bg-gray-200"></div>
        <h1 className="md:text-3xl text-[16px] font-semibold">Shop By Brand</h1>
        <div className="w-1/4 h-0.5 bg-gray-200"></div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 pt-[32px]">
        {brandLogos.map((brand) => (
          <div
            key={brand.name}
            className="overflow-hidden cursor-pointer relative group transition-all duration-500 ease-in-out transform origin-center hover:border-pink-200"
          >
            <img
              src={brand.src.src}
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
