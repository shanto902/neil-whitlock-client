import HomeSlider from "@/components/home/HomeSlider";
import useHomeSliders from "@/hooks/useHomeSliders";
import { fetchImageData } from "@/lib/imageFetcher";
import { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
  title: "HOME | NEILL WHITLOCK",
  description: "Neill Whitlock Photography",
};

export default async function Home() {
  const sliderData = await useHomeSliders();

  const sliderDataWithBlur = await Promise.all(
    sliderData.map(
      cache(async (slider) => {
        const imageData = await fetchImageData(
          `${process.env.NEXT_PUBLIC_ASSETS_URL}${slider.picture}`
        );
        return { ...slider, blurDataURL: imageData.base64 };
      })
    )
  );

  return <HomeSlider sliderData={sliderDataWithBlur} />;
}
