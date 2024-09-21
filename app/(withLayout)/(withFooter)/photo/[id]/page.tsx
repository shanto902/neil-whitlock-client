import ImageDetail from "@/components/gallery/ImageDetail";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { fetchImageData } from "@/lib/imageFetcher";
import { readFile, readItem, readItems } from "@directus/sdk";

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
      `${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}?key=optimized`
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
export async function generateStaticParams() {
  try {
    const result = await directus.request(
      readItems("pictures", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["id"],
      })
    );
    const params = result.map((item) => ({
      id: item.id,
    }));

    return params;
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
  };
}) => {
  const photo = await getPhoto(params.id as string);
  return <ImageDetail photo={photo as TImageData} />;
};

export default PhotoDetails;
