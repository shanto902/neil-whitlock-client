import CarouselSlide from "@/components/gallery/Carousel";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PageTitle from "@/components/PageTitle";
import { TCategory } from "@/interface/category.interface";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { readFile, readItems } from "@directus/sdk";
import { ReactNode } from "react";
import "react-multi-carousel/lib/styles.css";

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
    title: `${categoryName.name} | GALLERY - 2 | NEILL WHITLOCK`,
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
};
const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;

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

  // if (!photos) {
  //   notFound();
  // }
  return (
    <PaddingContainer className=" mt-16">
      <PageTitle>{descriptionData[0].name}</PageTitle>

      <div className="min-h-screen">
        <div className=" h-[82dvh]">{children}</div>
        <CarouselSlide photos={photos} params={params} />
      </div>

      <div className="mb-10 mx-auto py-0 lg:pt-10 text-center text-white text-sm font-semibold text-pretty leading-[35px] tracking-widest">
        {descriptionData[0].description}
      </div>
    </PaddingContainer>
  );
};

export default Layout;
