import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { readFile, readItems } from "@directus/sdk";
import { EmblaOptionsType } from "embla-carousel";
import { cache } from "react";

// Scroll to the element with the 'main' ID

// Generate static params for dynamic routes
export async function generateStaticParams() {
  try {
    const categories = await directus.request(
      readItems("categories", {
        fields: ["id", "slug"], // Include 'slug' in the fields to fetch
      })
    );
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    throw new Error("Error fetching categories");
  }
}

const getPictures = cache(async (slug: string) => {
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
        fields: ["id", "image", "alt", "category.slug"],
        sort: ["sort"],
      })
    );

    // Combine fetching image data (blur data + dimensions) in one step
    const newResult = await Promise.all(
      result.map(async (picture) => {
        // Fetch width and height of the image
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

    return newResult as TImageData[];
  } catch (error) {
    console.error("Error fetching picture data:", error);
    throw new Error("Error fetching pictures");
  }
});

const SliderPage = async ({ params }: { params: { slug: string } }) => {
  const OPTIONS: EmblaOptionsType = {};
  const pictures = await getPictures(params.slug);

  return <EmblaCarousel slides={pictures} options={OPTIONS} />;
};

export default SliderPage;
