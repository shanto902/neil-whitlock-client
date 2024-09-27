import ImageDetail2 from "@/components/gallery/ImageDetails2";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { fetchImageData } from "@/lib/imageFetcher";
import { readFile, readItem, readItems } from "@directus/sdk";
import { Suspense } from "react";

const getPhoto = async (id: string) => {
  try {
    const photo = await directus.request(readItem("pictures", id));
    const fileData = await directus.request(
      readFile(photo.image, {
        fields: ["width", "height"],
      })
    );
    // Fetch blurDataURL (for lazy loading)
    const imageData = await fetchImageData(
      `${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}`
    );
    // Combine the image properties (width, height, blurDataURL)
    return {
      ...photo,
      width: fileData.width,
      height: fileData.height,
      blurDataURL: imageData.base64,
    };
  } catch (error) {}
};
const getAllPhotosId = async (params: { slug: string }) => {
  try {
    const result = await directus.request(
      readItems("pictures", {
        filter: {
          category: {
            slug: {
              _eq: params.slug, // Filter by category.slug equal to the passed slug parameter
            },
          },
          status: {
            _eq: "published", // Ensure only published items are retrieved
          },
        },
        fields: ["id"],
      })
    );
    return result;
  } catch (error) {
    console.log("error on get all photos id");
  }
};

export async function generateStaticParams({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const result = await getAllPhotosId(params);

    const paramsList = result?.map((item) => ({
      id: item.id,
      slug: params.slug,
    }));

    return paramsList || [];
  } catch (error) {
    console.error("Error generating static params:", error);
    throw new Error("Error fetching static params");
  }
}

const PhotoDetails = async ({
  params,
}: {
  params: {
    id: string;
    slug: string;
  };
}) => {
  const photo = await getPhoto(params.id as string);

  return (
    <div className=" flex justify-center items-center mx-auto">
      <Suspense>
        <ImageDetail2 photo={photo as TImageData} />
      </Suspense>
    </div>
  );
};

export default PhotoDetails;
