import PaddingContainer from "@/components/layout/PaddingContainer";
import { categories } from "@/data/category";
import { TCategory } from "@/interface/category.interface";
import { fetchImageData } from "@/lib/imageFetcher";
import dynamic from "next/dynamic";
const ImageSliderWrapper = dynamic(
  () => import("@/components/gallery/ImageSliderWrapper"),
  { ssr: false }
);
// Adjust this import path

export function generateStaticParams() {
  return categories.map((category: TCategory) => ({
    slug: category.slug,
  }));
}

export type TImageData = {
  image: string;
  alt: string;
  description: string;
  blurDataURL?: string;
};

const GalleryPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const images: TImageData[] = [
    {
      image:
        "https://res.cloudinary.com/dey7en5ho/image/upload/v1720570156/neil/eufcblxhni6zj4ms11br.jpg",
      alt: "On the road 1",
      description:
        'For over 30 years, Ralph has traveled throughout North America, most especially in the Southwest. His travels range from road trips across New Mexico, Utah, Nevada, Wyoming and Colorado, to solitary solo expeditions along the Rio Grande river basin, the Sonoran Desert and deep into Monument Valley. Ralph often revisited his favorite spots throughout his life. "The United States is absolutely gorgeous."',
    },
    {
      image:
        "https://res.cloudinary.com/dey7en5ho/image/upload/v1720570155/neil/gwyyuy9l3adyhaz3imht.jpg",
      alt: "On the road 2",
      description:
        'In 2017, Neill ventured to Patagonia and Antarctica. He loved the open roads and remoteness of Patagonia. The vistas…the mountains…everywhere he looked was beautiful. He spent time on a ranch photographing the Gauchos, who had never been photographed before. He had a blast."',
    },
    {
      image:
        "https://res.cloudinary.com/dey7en5ho/image/upload/v1720570155/neil/r3bxxhun1manztxxwj1g.jpg",
      alt: "On the road 2",
      description:
        'In 2016, Neill spent 18 days driving around Iceland, camping in caves and capturing the unique landscape. He described it as one of the best trips he had ever taken. “It was like being on a different planet.”"',
    },
  ];

  const imagesWithBlur = await Promise.all(
    images.map(async (image) => {
      const imageData = await fetchImageData(`${image.image}`);
      return { ...image, blurDataURL: imageData.base64 };
    })
  );

  return (
    <PaddingContainer className="mt-20">
      <ImageSliderWrapper imagesWithBlur={imagesWithBlur} />
    </PaddingContainer>
  );
};

export default GalleryPage;
