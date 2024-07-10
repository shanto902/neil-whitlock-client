// app/page.tsx
import HomeSlider from "@/components/home/HomeSlider";
import { fetchImageData } from "@/lib/imageFetcher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Neill Whitlock",
  description: "...",
};

export type TSlider = {
  title: string;
  date: string;
  backgroundImageURL: string;
  blurDataURL: string;
};

export default async function Home() {
  const sliderData = [
    {
      title: "ON THE ROAD: THE VAST DESSERT",
      date: "7 OCTOBER 2019 - 15 JULY 2022",
      backgroundImageURL: `https://res.cloudinary.com/dey7en5ho/image/upload/v1720570156/neil/eufcblxhni6zj4ms11br.jpg`,
    },
    {
      title: "PATAGONIA/ANTARCTICA: THE FROZEN HILLS",
      date: "13 MARCH 2018 - 12 JANUARY 2022 ",
      backgroundImageURL: `https://res.cloudinary.com/dey7en5ho/image/upload/v1720570155/neil/gwyyuy9l3adyhaz3imht.jpg`,
    },
    {
      title: "ICELAND ROAD TRIP: BEAUTIFUL PLACES TO EXPLORE",
      date: "7 OCTOBER 2019 - 15 JULY 2022  ",
      backgroundImageURL: `https://res.cloudinary.com/dey7en5ho/image/upload/v1720570155/neil/r3bxxhun1manztxxwj1g.jpg`,
    },
  ];

  const sliderDataWithBlur = await Promise.all(
    sliderData.map(async (slider) => {
      const imageData = await fetchImageData(slider.backgroundImageURL);
      return { ...slider, blurDataURL: imageData.base64 };
    })
  );

  return (
    <>
      <HomeSlider sliderData={sliderDataWithBlur} />
    </>
  );
}
