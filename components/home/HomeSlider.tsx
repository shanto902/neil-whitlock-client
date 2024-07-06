"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";

const sliderData = [
  {
    title: "ON THE ROAD: THE VAST DESSERT",
    date: "7 OCTOBER 2019 - 15 JULY 2022",
    backgroundImageURL: "/assets/1.jpeg",
  },
  {
    title: "PATAGONIA/ANTARCTICA: THE FROZEN HILLS",
    date: "13 MARCH 2018 - 12 JANUARY 2022 ",
    backgroundImageURL:
      "https://unsplash.com/photos/hjwKMkehBco/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fFBvZXRyeSUyN3MlMjBUYXBlc3RyeXxlbnwwfHx8fDE3MTc1OTczMDZ8MA&force=true&w=1920",
  },
  {
    title: "ICELAND ROAD TRIP: BEAUTIFUL PLACES TO EXPLORE",
    date: "7 OCTOBER 2019 - 15 JULY 2022  ",
    backgroundImageURL:
      "https://unsplash.com/photos/KdeqA3aTnBY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fExpdGVyYXJ5JTIwQ29tbXVuaXR5fGVufDB8fHx8MTcxNzU5NzMzOHww&force=true&w=1920",
  },
];

const HomeSlider = () => {
  return (
    <Swiper
      scrollbar={{
        hide: true,
      }}
      modules={[Scrollbar]}
      className="w-full h-full mySwiper "
    >
      {sliderData.map((slider, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-screen flex items-center justify-center  overflow-hidden">
            {/* Background Image */}
            <Image
              width={1980}
              height={1020}
              className="absolute inset-0 object-cover w-full h-full"
              src={slider.backgroundImageURL}
              alt=""
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Content */}

            <PaddingContainer>
              <div className=" absolute bottom-10 text-white z-10 left-1/2 transform -translate-x-1/2 h-20  max-w-[1550px] px-10 w-full">
                <h2 className=" text-white text-4xl font-medium tracking-[3.60px]">
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
