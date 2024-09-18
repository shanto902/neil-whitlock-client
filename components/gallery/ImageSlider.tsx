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

import DynamicImage from "../DynamicImage";
import PageTitle from "../PageTitle";
import { TImageData } from "@/interface/pictures.interface";

function ImageSlider({
  imagesWithBlur,
  description,
  name,
}: {
  imagesWithBlur: TImageData[];
  description: string;
  name: string;
}) {
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
        <div style={{ maxHeight: "150px", width: "auto" }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${imagesWithBlur[i].image}`}
            alt={imagesWithBlur[i].alt}
            layout="intrinsic" // Makes sure the image is rendered with intrinsic size
            width={300} // You can adjust width as per the desired layout
            height={150} // Adjust height to match the required size
            objectFit="cover" // Ensures the image covers the entire area while maintaining aspect ratio
          />
        </div>
      );
    },

    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
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
      <PageTitle>{name}</PageTitle>

      <div>
        <Slider draggable={false} {...settings}>
          {imagesWithBlur.map((img, index) => (
            <div key={index} className="!flex items-center  justify-center ">
              <DynamicImage
                size={{
                  height: img.height as number,
                  width: img.width as number,
                }}
                blurDataURL={img.blurDataURL as string}
                image={img.image}
                alt={img.alt}
                className="  mx-auto lg:h-[70vh] h-[350px] bg-contain "
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

      <div className="  text-center mb-10">
        <div className="max-w-7xl mx-auto py-10 text-center text-white text-sm font-semibold text-pretty leading-[35px] tracking-widest">
          {description}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
