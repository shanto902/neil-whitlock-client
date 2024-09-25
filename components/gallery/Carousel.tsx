"use client";
import { TImageData } from "@/interface/pictures.interface";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import SelectedImage from "./SelectedImage";
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
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
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
  return (
    <Carousel
      className="max-w-6xl mx-auto"
      swipeable={true}
      draggable={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
    >
      {photos.map((image, i) => (
        <Link
          scroll={false}
          className=" relative" // Align items vertically
          key={i}
          href={`/gallery-2/${params.slug}/${image.id}`}
        >
          <Image
            className="object-cover w-20 aspect-square " // Fixed height, width adjusts automatically
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image.image}`}
            alt={image.alt}
            height={image.height}
            width={image.width}
          />
          <SelectedImage id={image.id} />
        </Link>
      ))}
    </Carousel>
  );
};

export default CarouselSlide;
