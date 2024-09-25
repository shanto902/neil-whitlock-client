import GalleryCard2 from "@/components/gallery/GalleryCard2";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PageTitle from "@/components/PageTitle";

import useCategories from "@/hooks/useCategories";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GALLERY - 2 | NEILL WHITLOCK",
  description: "Photography Website",
};
const GalleryPage = async () => {
  const categories = await useCategories();

  return (
    <PaddingContainer className="mt-20 ">
      <PageTitle>GALLERY 2</PageTitle>

      <div className="w-full h-[17px] justify-start items-center gap-3.5 inline-flex">
        <div className="text-zinc-100 text-sm font-normal  tracking-widest">
          CATEGORIES
        </div>
        <div className="w-full h-[0px] border border-gray-200"></div>
      </div>

      <section className="my-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-16">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${
              category.shape === "wide" &&
              "lg:col-span-3 md:col-span-2 col-span-1"
            }`}
          >
            <GalleryCard2
              id={category.id}
              name={category.name}
              thumbnail={category.thumbnail}
              slug={category.slug}
              key={category.id}
              shape={category.shape}
            />
          </div>
        ))}
      </section>
    </PaddingContainer>
  );
};

export default GalleryPage;
