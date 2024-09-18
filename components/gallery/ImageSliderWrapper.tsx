"use client";

import { Suspense } from "react";
import ImageSlider from "./ImageSlider";
import { TImageData } from "@/interface/pictures.interface";

const ImageSliderWrapper = ({
  imagesWithBlur,
  description,
  name,
}: {
  imagesWithBlur: TImageData[];
  description: string;
  name: string;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageSlider
        imagesWithBlur={imagesWithBlur}
        description={description}
        name={name}
      />
    </Suspense>
  );
};

export default ImageSliderWrapper;
