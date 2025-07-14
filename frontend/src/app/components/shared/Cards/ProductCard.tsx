/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

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
      <img
        className="aspect-square w-full h-[220px] object-cover rounded-lg"
        src={img}
        alt=""
      />
      <div className="flex flex-col flex-grow space-y-3 text-center mt-4">
        <h1 className="font-semibold text-sm leading-tight text-left w-3/4">
          {name}
        </h1>
        <p className="font-medium text-gray-700 text-left">{price} Taka</p>
        <div className="md:flex gap-1.5 items-center justify-center space-y-2">
          {/* Button Div to make them side by side */}

          {/* Add to Cart Button */}
          <Link href="" className="mt-auto flex-1/2 cursor-pointer block">
            <button className="cursor-pointer block rounded px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto relative">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold">Add to Cart</span>
            </button>
          </Link>

          {/* View Details Button */}
          <Link
            href={`/products/${slug}`}
            className="mt-auto flex-1/2 block cursor-pointer"
          >
            <button className="cursor-pointer block rounded px-5 py-2.5 overflow-hidden group bg-[#FFF300] hover:bg-gradient-to-r hover:from-[#FFF300] hover:to-[#FFF700] text-black hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto relative">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold">View Details</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
