"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "./styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowLeft from "@/public/assets/svg/arrow_left.svg";
import arrowRight from "@/public/assets/svg/arrow_right.svg";
import { TImageData } from "@/app/(withLayout)/(withFooter)/gallery/[slug]/page";
import DynamicImage from "../DynamicImage";
import PageTitle from "../PageTitle";

function ImageSlider({ imagesWithBlur }: { imagesWithBlur: TImageData[] }) {
  const [fadeClass, setFadeClass] = useState("fade-in");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setCurrentIndex(parseInt(id, 10));
    } else {
      setCurrentIndex(0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentIndex !== null) {
      setFadeClass("fade-in");
    }
  }, [currentIndex]);

  const handleBeforeChange = () => {
    setFadeClass("fade-out");
  };

  const CustomPrevArrow = useCallback(
    (props: { onClick: () => void }) => (
      <div className="absolute left-4 -bottom-32 cursor-pointer">
        <Image
          alt="arrowLeft"
          src={arrowLeft}
          onClick={props.onClick}
          className="h-6 w-20"
        />
      </div>
    ),
    []
  );

  const CustomNextArrow = useCallback(
    (props: { onClick: () => void }) => (
      <div className="absolute right-4 -bottom-32 cursor-pointer">
        <Image
          alt="arrowRight"
          src={arrowRight}
          onClick={props.onClick}
          className="h-6 w-20"
        />
      </div>
    ),
    []
  );

  const settings = {
    customPaging: function (i: number) {
      return (
        <div className="custom-thumb">
          <Image
            src={imagesWithBlur[i].image}
            alt={imagesWithBlur[i].alt}
            width={80}
            height={60}
            className="object-cover w-full h-full"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <CustomNextArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <CustomPrevArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    beforeChange: handleBeforeChange,
    initialSlide: currentIndex !== null ? currentIndex : 0, // Use currentIndex if it's set
    afterChange: (index: number) => {
      setCurrentIndex(index);
      router.replace(`${pathname}?id=${index}`, { scroll: false });
    },
  };

  if (currentIndex === null) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="gallery mx-auto max-w-7xl">
      <PageTitle> ON THE ROAD</PageTitle>

      <div>
        <Slider {...settings}>
          {imagesWithBlur.map((img, index) => (
            <div
              key={index}
              className="!flex items-center lg:h-[931px] h-[350px] justify-center"
            >
              <DynamicImage
                size={{ height: 931, width: 1267 }}
                blurDataURL={img.blurDataURL as string}
                url={img.image}
                alt={img.alt}
                className="bg-contain mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="thumbnail-slider-info text-center mt-[107px]">
        <span className="text-white">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(imagesWithBlur.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className={` mt-5 transition-opacity duration-500 text-center mb-10 ${
          fadeClass === "fade-in" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto py-10 text-center text-white text-sm font-semibold text-pretty leading-[35px] tracking-widest">
          {imagesWithBlur[currentIndex]?.description}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
