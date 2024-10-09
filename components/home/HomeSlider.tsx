// components/home/HomeSlider.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { Scrollbar, Mousewheel } from "swiper/modules"; // Add Mousewheel module
import PaddingContainer from "../layout/PaddingContainer";
import DynamicImage from "../DynamicImage";
import { TSlider } from "@/interface/homeSlider.interface";
import Link from "next/link";

const HomeSlider = ({ sliderData }: { sliderData: TSlider[] }) => {
  return (
    <Swiper
      scrollbar={{
        hide: true,
      }}
      mousewheel={true} // Enable mousewheel scroll
      freeMode={true} // Enable free mode for smooth scrolling
      modules={[Scrollbar, Mousewheel]} // Add Mousewheel module to Swiper
      className="w-full h-full mySwiper"
    >
      {sliderData.map((slider, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <DynamicImage
              key={i}
              image={slider.picture}
              alt={slider.title}
              className="absolute inset-0 w-full h-full"
              blurDataURL={slider.blurDataURL}
              isCover
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Content */}
            <PaddingContainer>
              <div className="absolute bottom-2 text-white z-10 left-1/2 transform -translate-x-1/2 h-24 max-w-[1550px] px-10 w-full">
                <Link href={slider.url}>
                  <h2 className="text-white xl:text-4xl text-lg md:text-2xl font-medium tracking-[3.60px]">
                    {slider.title}
                  </h2>
                </Link>
              </div>
            </PaddingContainer>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
