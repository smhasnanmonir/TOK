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
              src="https://cdn.tokbd.shop/Main-Banner-PC-01.webp"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center md:pl-[50px] space-y-[16px] px-[20px]">
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
              src="https://cdn.tokbd.shop/Main-Banner-PC-03.webp"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center md:pl-[50px] space-y-[16px] px-[20px]    ">
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
