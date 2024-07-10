"use client";

import { Suspense } from "react";
import ImageSlider from "./ImageSlider";
import { TImageData } from "@/app/(withLayout)/(withFooter)/gallery/[slug]/page";

const ImageSliderWrapper = ({
  imagesWithBlur,
}: {
  imagesWithBlur: TImageData[];
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageSlider imagesWithBlur={imagesWithBlur} />
    </Suspense>
  );
};

export default ImageSliderWrapper;
