import ButtonCloseModal from "@/components/gallery/ButtonCloseModal";
import ImageDetail from "@/components/gallery/ImageDetail";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { fetchImageData } from "@/lib/imageFetcher";
import { readFile, readItem } from "@directus/sdk";
import { FC } from "react";

interface ModalDetailPageProps {
  params: {
    id: string;
  };
}

const ModalDetailPage: FC<ModalDetailPageProps> = async ({ params }) => {
  // Fetch image and metadata
  const getPhoto = async () => {
    try {
      const photo = await directus.request(readItem("pictures", params.id));
      const fileData = await directus.request(
        readFile(photo.image, {
          fields: ["width", "height"],
        })
      );
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
    } catch (error) {
      console.error("Error fetching photo", error);
    }
  };
  // Fetch the photo data
  const photo = await getPhoto();

  return (
    <div className="fixed inset-0 bg-zinc-900/80 z-10 flex justify-center items-center">
      <ImageDetail photo={photo as TImageData} />
      <ButtonCloseModal />
    </div>
  );
};

export default ModalDetailPage;
