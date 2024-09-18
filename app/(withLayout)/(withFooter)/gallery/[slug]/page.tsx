import PaddingContainer from "@/components/layout/PaddingContainer";
import { TCategory } from "@/interface/category.interface";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { fetchImageData } from "@/lib/imageFetcher";
import { readFile, readItems } from "@directus/sdk";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const ImageSliderWrapper = dynamic(
  () => import("@/components/gallery/ImageSliderWrapper"),
  { ssr: false }
);

const getCategoryName = async (slug: string) => {
  try {
    const result = await directus.request(
      readItems("categories", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: ["id", "name", "description", "slug"],
        sort: ["sort"],
      })
    );
    return result[0] as TCategory;
  } catch (error) {
    console.error("Error category", error);
    throw new Error("Error fetching category");
  }
};

export const generateMetadata = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const categoryName = await getCategoryName(slug);

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
    title: `${categoryName.name} | GALLERY | NEILL WHITLOCK`,
    description: categoryName.description,
    openGraph: {
      title: categoryName.name,
      description: categoryName.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${categoryName.slug}`,
      siteName: "Neil Whitlock Photography",
      type: "website",
    },
  };
};
// Adjust this import path

const getPictures = async (slug: string) => {
  try {
    const result = await directus.request(
      readItems("pictures", {
        filter: {
          status: {
            _eq: "published",
          },
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

    // Await the resolution of all promises returned by map
    const newResult = await Promise.all(
      result.map(async (picture) => {
        const fileData = await directus.request(
          readFile(picture.image, {
            fields: ["width", "height"],
          })
        );
        return {
          ...picture,
          width: fileData.width,
          height: fileData.height,
        };
      })
    );

    console.log(newResult);

    return newResult as TImageData[];
  } catch (error) {
    console.error("Error fetching picture data:", error);
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
      fields: ["name", "description"],
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
        name={descriptionData[0].name}
      />
    </PaddingContainer>
  );
};

export default GalleryPage;
