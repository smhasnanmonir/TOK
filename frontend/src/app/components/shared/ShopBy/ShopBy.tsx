const ShopBy = ({ title }: { title: string }) => {
  return (
    <div className="pt-[24px] md:px-[40px]">
      <div className="flex items-center justify-between pb-[20px] max-w-full">
        <div className="flex-1 h-0.5 bg-gray-200"></div>
        <h1 className="mx-4 md:text-3xl text-[18px] font-semibold">{title}</h1>
        <div className="flex-1 h-0.5 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ShopBy;
