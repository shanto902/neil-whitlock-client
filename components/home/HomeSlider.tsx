// components/home/HomeSlider.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import PaddingContainer from "../layout/PaddingContainer";
import DynamicImage from "../DynamicImage";
import { TSlider } from "@/app/(withLayout)/page";

const HomeSlider = ({ sliderData }: { sliderData: TSlider[] }) => {
  return (
    <Swiper
      scrollbar={{
        hide: true,
      }}
      modules={[Scrollbar]}
      className="w-full h-full mySwiper"
    >
      {sliderData.map((slider, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <DynamicImage
              key={i}
              url={slider.backgroundImageURL}
              alt={slider.title}
              className="absolute inset-0 object-cover w-full h-full"
              blurDataURL={slider.blurDataURL}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Content */}
            <PaddingContainer>
              <div className="absolute bottom-10 text-white z-10 left-1/2 transform -translate-x-1/2 h-20 max-w-[1550px] px-10 w-full">
                <h2 className="text-white xl:text-4xl text-lg md:text-2xl font-medium tracking-[3.60px]">
                  {slider.title}
                </h2>
                <p className="text-white mt-3 text-sm font-medium tracking-wider">
                  {slider.date}
                </p>
              </div>
            </PaddingContainer>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
