/* eslint-disable @next/next/no-img-element */

const BestSellerProduct = () => {
  return (
    <div className="py-[40px]">
      <div>
        <div className=" flex gap-2 items-center justify-center">
          <div className="w-1/4 h-0.5 bg-gray-200"></div>
          <h1 className="text-3xl font-semibold">Best Sellers</h1>
          <div className="w-1/4 h-0.5 bg-gray-200"></div>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 place-content-center gap-6 px-[20px]">
          <div className="grid place-items-center space-y-4">
            <img
              className="aspect-square w-[220px] h-[220px] object-cover rounded-lg"
              src="https://i.ibb.co/HpYL4z7B/Snapinst-app-469719158-1338517800838726-1045303380722931401-n-1080.jpg"
              alt=""
            />
            <div className="space-y-3 text-center max-w-[220px]">
              <h1 className="font-semibold text-sm leading-tight">
                Medicube Collagen Jelly Cream 110 ml
              </h1>
              <p className="font-medium text-gray-700">2200 Taka</p>
              <a
                href=""
                className="block rounded px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add to Cart</span>
              </a>
            </div>
          </div>
          {/* 2nd */}
          <div className="grid place-items-center space-y-4">
            <img
              className="aspect-square w-[220px] h-[220px] object-cover rounded-lg"
              src="https://i.ibb.co/d0cvK210/Snapinst-app-445579792-978053920638439-2607689693851921904-n-1080.jpg"
              alt=""
            />
            <div className="space-y-3 text-center max-w-[220px]">
              <h1 className="font-semibold text-sm leading-tight">
                Beauty of joseon Light On Serum:Centella + Vita C 10 ml
              </h1>
              <p className="font-medium text-gray-700">1800 Taka</p>
              <a
                href=""
                className="block rounded px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add to Cart</span>
              </a>
            </div>
          </div>
          <div className="grid place-items-center space-y-4">
            <img
              className="aspect-square w-[220px] h-[220px] object-cover rounded-lg"
              src="https://i.ibb.co/SwXT7f04/Snapinst-app-432326186-311232084945719-1608019234056345119-n-1080.jpg"
              alt=""
            />
            <div className="space-y-3 text-center max-w-[220px]">
              <h1 className="font-semibold text-sm leading-tight">
                ANUA Heartleaf Quercetinol Pore Deep Cleansing Foam 150 ml
              </h1>
              <p className="font-medium text-gray-700">1800 Taka</p>
              <a
                href=""
                className="block rounded px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add to Cart</span>
              </a>
            </div>
          </div>
          <div className="grid place-items-center space-y-4">
            <img
              className="aspect-square w-[220px] h-[220px] object-cover rounded-lg"
              src="https://i.ibb.co/2zHS6Mc/Snapinst-app-443228203-2089382441439144-6748731863557266544-n-1080.jpg"
              alt=""
            />
            <div className="space-y-3 text-center max-w-[220px]">
              <h1 className="font-semibold text-sm leading-tight">
                Anua 10% Niacinamide+ 4% Txa Serum 30 ml{" "}
              </h1>
              <p className="font-medium text-gray-700">2200 Taka</p>
              <a
                href=""
                className="block rounded px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300 text-center w-full mx-auto"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add to Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProduct;
