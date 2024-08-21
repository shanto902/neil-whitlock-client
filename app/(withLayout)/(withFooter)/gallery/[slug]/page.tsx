import PaddingContainer from "@/components/layout/PaddingContainer";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { fetchImageData } from "@/lib/imageFetcher";
import { readItems } from "@directus/sdk";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const ImageSliderWrapper = dynamic(
  () => import("@/components/gallery/ImageSliderWrapper"),
  { ssr: false }
);
// Adjust this import path

const getPictures = async (slug: string) => {
  try {
    const result = await directus.request(
      readItems("pictures", {
        filter: {
          category: {
            slug: {
              _eq: slug,
            },
          },
        },
        fields: ["id", "image", "alt"],
        sort: ["sort"],
      })
    );

    return result as TImageData[];
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw new Error("Error fetching post");
  }
};

export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("categories", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug"],
      })
    );

    const allParams =
      (result as { slug: string }[]).map((item) => ({ slug: item.slug })) || [];
    return allParams;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories");
  }
};

const GalleryPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const descriptionData = await directus.request(
    readItems("categories", {
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
      fields: ["description"],
    })
  );

  const photos = await getPictures(params.slug);

  if (!photos) {
    notFound();
  }

  const imagesWithBlur = await Promise.all(
    photos.map(async (image) => {
      const imageData = await fetchImageData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${image.image}`
      );
      return { ...image, blurDataURL: imageData.base64 };
    })
  );

  return (
    <PaddingContainer className="mt-20">
      <ImageSliderWrapper
        imagesWithBlur={imagesWithBlur}
        description={descriptionData[0].description}
      />
    </PaddingContainer>
  );
};

export default GalleryPage;
