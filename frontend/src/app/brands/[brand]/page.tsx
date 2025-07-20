const page = ({ params }: { params: { brand: string } }) => {
  return (
    <div>
      <div className="bg-pink-500/20 px-[20px] py-[24px] flex flex-col space-y-[12px]">
        <h1 className="md:text-center md:text-2xl font-semibold">
          TOK offers products from top Korean brands
        </h1>
        <p className="md:text-center md:text-xl text-sm text-gray-500">
          Straightly for Korea! Buy with confidence.
        </p>
      </div>
      <div>
        <h1>{params.brand}</h1>
      </div>
    </div>
  );
};

export default page;
