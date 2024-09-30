const PaddingContainer = dynamic(
  () => import("@/components/layout/PaddingContainer")
);

import PageTitle from "@/components/PageTitle";
import { TCategory } from "@/interface/category.interface";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
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
    title: `${categoryName?.name} | GALLERY | NEILL WHITLOCK`,
    description: categoryName?.description,
    openGraph: {
      title: categoryName?.name,
      description: categoryName?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${categoryName?.slug}`,
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

  // const photos = await getPictures(params.slug);

  const categories = await getCategoryName(params.slug);

  if (!categories) {
    notFound();
  }
  return (
    <PaddingContainer className="relative mt-16">
      {/* This will enable vertical scrolling within the container */}
      <div className="min-h-screen snap-mandatory snap-y">
        {/* First Section: Page Title */}
        <div className="snap-start">
          <PageTitle>{descriptionData[0].name}</PageTitle>
        </div>

        {/* Second Section: Children (Content) */}
        <div className="snap-center h-screen mb-5">{children}</div>

        {/* Third Section: Description */}
        <div className="snap-end mb-10 mx-auto py-0 text-center text-white text-sm font-semibold text-pretty leading-[35px] tracking-widest">
          {descriptionData[0].description}
        </div>
      </div>
    </PaddingContainer>
  );
};

export default Layout;
