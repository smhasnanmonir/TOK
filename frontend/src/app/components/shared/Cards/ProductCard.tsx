/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import AddToCartButton from "../Button/AddToCartButton";
// import DetailsButton from "../Button/DetailsButton";

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
    <Link
      href={`/products/${slug}`}
      className="flex flex-col h-full w-full rounded-md p-[8px] md:p-[16px] cursor-pointer border-[2px] border-gray-200/40 inset-shadow-indigo-500/50 hover:border-pink-200 transition-all duration-300"
    >
      <div className="w-full aspect-square overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover" src={img} alt="" />
      </div>
      <div className="w-full flex flex-col flex-1 justify-between mt-4 space-y-[4px]">
        <h1 className="font-semibold text-sm leading-tight w-full text-left md:min-h-0 min-h-[50px]">
          {name}
        </h1>
        <p className="font-medium text-gray-700 w-full text-left text-[18px]">
          {price} Taka
        </p>

        <div className="grid w-full">
          {/* Add to Cart Button */}
          <AddToCartButton></AddToCartButton>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
