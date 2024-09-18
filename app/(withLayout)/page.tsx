// app/page.tsx
import HomeSlider from "@/components/home/HomeSlider";
import useHomeSliders from "@/hooks/useHomeSliders";
import { fetchImageData } from "@/lib/imageFetcher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOME | NEILL WHITLOCK",
  description: "...",
};

export default async function Home() {
  const sliderData = await useHomeSliders();

  const sliderDataWithBlur = await Promise.all(
    sliderData.map(async (slider) => {
      const imageData = await fetchImageData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${slider.picture}`
      );
      return { ...slider, blurDataURL: imageData.base64 };
    })
  );

  return (
    <>
      <HomeSlider sliderData={sliderDataWithBlur} />
    </>
  );
}
