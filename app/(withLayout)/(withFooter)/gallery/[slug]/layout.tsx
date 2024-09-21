import PaddingContainer from "@/components/layout/PaddingContainer";
import PageTitle from "@/components/PageTitle";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { ReactNode, Suspense } from "react";

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
  return (
    <PaddingContainer className="pt-20">
      <PageTitle>{descriptionData[0].name}</PageTitle>
      <div className="  text-center lg:mb-5">
        <div className="max-w-7xl mb-10 mx-auto py-0 lg:py-10 text-center text-white text-sm font-semibold text-pretty leading-[35px] tracking-widest">
          {descriptionData[0].description}
        </div>
      </div>
      <Suspense>
        <div>{children}</div>
      </Suspense>
    </PaddingContainer>
  );
};

export default Layout;
