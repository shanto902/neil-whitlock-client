"use client";

import { Suspense } from "react";
import ImageSlider from "./ImageSlider";
import { TImageData } from "@/interface/pictures.interface";

const ImageSliderWrapper = ({
  imagesWithBlur,
  description,
}: {
  imagesWithBlur: TImageData[];
  description: string;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageSlider imagesWithBlur={imagesWithBlur} description={description} />
    </Suspense>
  );
};

export default ImageSliderWrapper;
