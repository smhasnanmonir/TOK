"use client";
import { useRouter } from "next/navigation";

const DetailsButton = ({ slug }: { slug: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/products/${slug}`);
      }}
      className="cursor-pointer block rounded px-5 py-2.5 overflow-hidden group bg-[#FFF300] hover:bg-gradient-to-r hover:from-[#FFF300] hover:to-[#FFF700] text-black hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto relative"
      aria-label="View product details"
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative font-semibold">Details</span>
    </button>
  );
};

export default DetailsButton;
