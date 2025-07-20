/* eslint-disable @next/next/no-img-element */

import AddToCartButton from "../Button/AddToCartButton";
import DetailsButton from "../Button/DetailsButton";

const ProductCard = ({
  img,
  name,
  price,
  slug,
}: {
  img: string;
  name: string;
  price: number;
  slug: string;
}) => {
  return (
    <div className="flex flex-col h-full w-full rounded-md p-[8px] md:p-[16px] cursor-pointer border-[2px] border-gray-200/40 inset-shadow-indigo-500/50 hover:border-pink-200 transition-all duration-300">
      <div className="w-full aspect-square overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover" src={img} alt="" />
      </div>
      <div className="w-full flex flex-col flex-1 justify-between mt-4">
        <h1 className="font-semibold text-sm leading-tight w-full text-left md:min-h-0 min-h-[50px]">
          {name}
        </h1>
        <p className="font-medium text-gray-700 w-full text-left">{price}</p>

        <div className="grid md:grid-cols-2 gap-[8px] w-full">
          {/* Add to Cart Button */}
          <AddToCartButton></AddToCartButton>

          {/* View Details Button */}
          <DetailsButton slug={slug}></DetailsButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
