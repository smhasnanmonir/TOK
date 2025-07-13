/* eslint-disable @next/next/no-img-element */

const Card = ({
  props,
}: {
  props: { id: number; name: string; img: string };
}) => {
  return (
    <div className="block w-full rounded-md p-[8px] md:p-[16px] cursor-pointer border-[2px] border-gray-200/20 inset-shadow-indigo-500/50 hover:border-pink-200 transition-all duration-300">
      <img
        className="w-full h-auto rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
        src={props.img}
        alt={props.name}
      />
      <h1 className="text-center text-[#E30B5D] font-semibold text-[12px] pt-[8px] md:pt-[12px] font-poppins">
        {props.name}
      </h1>
    </div>
  );
};

export default Card;
