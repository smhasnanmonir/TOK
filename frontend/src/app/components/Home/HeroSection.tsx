"use client";
/* eslint-disable @next/next/no-img-element */

// import { Clock7Icon, HandCoinsIcon, ShipIcon } from "lucide-react";
// import heroImg from "../../asset/hero/hero.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Zoom } from "swiper/modules";
import "swiper/css/bundle";

const HeroSection = () => {
  return (
    <div className="">
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #ec4899 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #be185d !important;
        }

        /* Zoom in effect during fade transition */
        .swiper-slide {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .swiper-slide-active {
          transform: scale(1.05);
        }

        .swiper-slide img {
          transition: transform 0.3s ease;
        }

        .swiper-slide-active img {
          transform: scale(1.1);
        }
      `}</style>
      {/* <div className="grid place-content-center space-y-[32px]">
        <h1 className="text-3xl md:text-4xl text-center text-black font-semibold">
          Be good to your skin.
        </h1>
        <p className="text-sm md:text-base text-center text-gray-600 font-medium">
          Get 100% Original{" "}
          <span className="underline decoration-pink-500 underline-offset-2 decoration-2">
            Hand Picked
          </span>{" "}
          Skincare products from Korea!
        </p>
        <div className="flex gap-[24px]">
          <div className="grid  justify-items-center border-2 p-4 rounded-2xl border-gray-200 inset-shadow-sm inset-shadow-pink-100 hover:inset-shadow-pink-300 transition-all ease-linear duration-300 cursor-pointer">
            <ShipIcon size={34} color="#FB6F92" />
            <p>Imported from Korea</p>
          </div>
          <div className="grid  justify-items-center border-2 p-4 rounded-2xl border-gray-200 inset-shadow-sm inset-shadow-pink-100 hover:inset-shadow-pink-300 transition-all ease-linear duration-300 cursor-pointer">
            <Clock7Icon size={34} color="#FB6F92" />
            <p>24/7 Human Support</p>
          </div>
          <div className="grid  justify-items-center border-2 p-4 rounded-2xl border-gray-200 inset-shadow-sm inset-shadow-pink-100 hover:inset-shadow-pink-300 transition-all ease-linear duration-300 cursor-pointer">
            <HandCoinsIcon size={34} color="#FB6F92" />
            <p>Cash on Delivery</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="#_"
            className="relative rounded px-5 py-2.5 overflow-hidden group bg-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-semibold">Browser Products</span>
          </a>
        </div>
      </div> */}
      <div className="">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Zoom]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          effect="fade"
          zoom={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <img
              className="w-screen h-[450px] md:h-[400px] object-cover relative"
              src="https://i.ibb.co/9mnJgdfp/Main-Banner-PC-01.webp"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center md:pl-[50px] space-y-[16px]">
              <h1 className="text-black text-4xl font-bold">
                Be good to your skin.
              </h1>
              <p className="text-black text-xl font-semibold">
                Get 100% Original Hand Picked Skincare products from Korea!
              </p>
              <button className="bg-pink-500 text-white cursor-pointer hover:bg-pink-600 transition-all ease-linear duration-300 px-4 py-2 rounded-md w-[175px] h-[50px] flex items-center justify-center">
                <span className="text-[16px] font-semibold">Shop Now</span>
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-screen h-[450px] md:h-[400px] object-cover relative"
              src="https://i.ibb.co/nsbgFy1z/Main-Banner-PC-04-eaa3ac1a-8ad4-41ba-981f-44be50081064.webp"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center md:pl-[50px] space-y-[16px]">
              <h1 className="text-black text-4xl font-bold">
                Get Anua Rice 70+ Ceramide at 35% Discount
              </h1>
              <p className="text-black text-xl font-semibold">Grab it now!</p>

              <button className="bg-pink-500 text-white cursor-pointer hover:bg-pink-600 transition-all ease-linear duration-300 px-4 py-2 rounded-md w-[175px] h-[50px] flex items-center justify-center">
                <span className="text-[16px] font-semibold">Shop Now</span>
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-screen h-[450px] md:h-[400px] object-cover relative"
              src="https://i.ibb.co/LzCKfFbv/Main-Banner-PC-03.webp"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center md:pl-[50px] space-y-[16px]">
              <h1 className="text-black text-4xl font-bold">
                Expiry Date till 2028!!
              </h1>
              <p className="text-black text-xl font-semibold">
                {" "}
                Tension free use.
              </p>
              <button className="bg-pink-500 text-white cursor-pointer hover:bg-pink-600 transition-all ease-linear duration-300 px-4 py-2 rounded-md w-[175px] h-[50px] flex items-center justify-center">
                <span className="text-[16px] font-semibold">Grab it now!</span>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
