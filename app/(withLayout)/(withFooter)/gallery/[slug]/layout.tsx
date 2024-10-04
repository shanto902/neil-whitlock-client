const PaddingContainer = dynamic(
  () => import("@/components/layout/PaddingContainer")
);

import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { TCategory } from "@/interface/category.interface";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { ReactNode, Suspense } from "react";
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

  const categories = await getCategoryName(params.slug);

  if (!categories) {
    notFound();
  }
  return (
    <PaddingContainer className="relative mt-20">
      {/* This will enable vertical scrolling within the container */}
      <div className="lg:min-h-screen">
        {/* First Section: Page Title */}

        <PageTitle>{descriptionData[0]?.name}</PageTitle>

        {/* Second Section: Children (Content) */}
        <Suspense fallback={<Loading />}>
          <div className="mb-5">{children}</div>
        </Suspense>

        {/* Third Section: Description */}
        <div className=" my-10 mx-auto py-0 text-center text-white text-sm font-semibold text-pretty leading-[35px] tracking-widest">
          {descriptionData[0]?.description}
        </div>
      </div>
    </PaddingContainer>
  );
};

export default Layout;
