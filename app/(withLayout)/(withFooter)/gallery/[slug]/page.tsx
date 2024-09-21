import ZoomImage from "@/components/gallery/ZoomImage";
import { TCategory } from "@/interface/category.interface";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { readFile, readItems } from "@directus/sdk";
import Link from "next/link";

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

        // Fetch blurDataURL (for lazy loading)
        // const imageData = await fetchImageData(
        //   `${process.env.NEXT_PUBLIC_ASSETS_URL}${picture.image}?key=optimized`
        // );

        // Combine the image properties (width, height, blurDataURL)
        return {
          ...picture,
          width: fileData.width,
          height: fileData.height,
          // blurDataURL: imageData.base64,
        };
      })
    );

    return newResult as TImageData[];
  } catch (error) {
    console.error("Error fetching picture data:", error);
    throw new Error("Error fetching pictures");
  }
};

const ImagesPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const photos = await getPictures(params.slug);

  // if (!photos) {
  //   notFound();
  // }

  return (
    <div className="columns-1 gap-3 sm:columns-2 sm:gap-5 md:columns-3 lg:columns-4 mb-20">
      {photos.map((image, i) => (
        // Wrapping each image in Suspense for lazy loading fallback

        <Link key={i} href={`/photo/${image.id}`}>
          <ZoomImage image={image} />
        </Link>
      ))}
    </div>
  );
};

export default ImagesPage;
