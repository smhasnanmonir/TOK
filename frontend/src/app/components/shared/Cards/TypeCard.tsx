/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const TypeCard = ({
  props,
  url,
}: {
  props: { id: number; name: string; img: string };
  url: string;
}) => {
  return (
    <Link
      className="block w-full rounded-md p-[8px] md:p-[16px] cursor-pointer border-[2px] border-gray-200/20 inset-shadow-indigo-500/50 hover:border-pink-200 transition-all duration-300"
      href={url}
    >
      <img
        className="w-full h-auto rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
        src={props.img}
        alt={props.name}
      />
      <h1 className="text-center text-[#E30B5D] font-semibold text-[16px] pt-[8px] md:pt-[12px] font-poppins">
        {props.name}
      </h1>
    </Link>
  );
};

export default TypeCard;
