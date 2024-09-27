"use client";
import { TImageData } from "@/interface/pictures.interface";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import SelectedImage from "./SelectedImage";
import "./styles.css";
import clsx from "clsx";
import { useState } from "react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 14,
    slidesToSlide: 14, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 8,
    slidesToSlide: 8, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
};

const CarouselSlide = ({
  photos,
  params,
}: {
  photos: TImageData[];
  params: {
    slug: string;
  };
}) => {
  // State to track loading state for each image individually
  const [isLoading, setIsLoading] = useState<boolean[]>(
    Array(photos.length).fill(true)
  );

  // Function to handle the loading state when an image is loaded
  const handleImageLoad = (index: number) => {
    setIsLoading((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = false; // Set the loading state for the specific image
      return newLoadingState;
    });
  };

  return (
    <Carousel
      className="mx-auto"
      swipeable
      arrows={false}
      showDots
      renderButtonGroupOutside={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      draggable
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
    >
      {photos.map((image, i) => (
        <Link
          scroll={false}
          className="relative"
          key={i}
          href={`/gallery/${params.slug}/${image.id}`}
        >
          {isLoading[i] && (
            <div
              className="animate-pulse bg-stone-700"
              style={{
                height: "100%",
                width: "100%",
              }}
            ></div>
          )}
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image.image}`}
            alt={image.alt}
            height={image.height}
            width={image.width}
            className={clsx(
              "object-cover aspect-[4/3] transition-opacity duration-300",
              isLoading[i] ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => handleImageLoad(i)}
          />
          <SelectedImage id={image.id} />
        </Link>
      ))}
    </Carousel>
  );
};

export default CarouselSlide;
