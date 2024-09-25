import Modal from "@/components/modal/Modal";
import { TImageData } from "@/interface/pictures.interface";
import directus from "@/lib/directus";
import { fetchImageData } from "@/lib/imageFetcher";
import { readFile, readItems, readItem } from "@directus/sdk";
import Link from "next/link";
import { FC } from "react";

interface ModalDetailPageProps {
  params: {
    id: string;
  };
}

const ModalDetailPage: FC<ModalDetailPageProps> = async ({ params }) => {
  // Fetch the current image and metadata
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

      return {
        ...photo,
        width: fileData.width,
        height: fileData.height,
        blurDataURL: imageData.base64,
      } as TImageData;
    } catch (error) {
      console.error("Error fetching photo", error);
    }
  };

  // Fetch the photo data
  const photo = await getPhoto();

  // Fetch all images for navigation (you may optimize this by fetching only adjacent ids)
  const getAllPhotos = async () => {
    try {
      const result = await directus.request(
        readItems("pictures", {
          fields: ["id", "category"],

          filter: {
            status: {
              _eq: "published",
            },
            category: {
              _eq: photo?.category,
            },
          },
          sort: ["sort"],
        })
      );
      return result as { id: string }[];
    } catch (error) {
      console.error("Error fetching photos", error);
    }
  };

  // console.log(photo);
  const allPhotos = await getAllPhotos();

  if (!photo || !allPhotos) {
    return;
  }

  // Find the current photo index
  const currentIndex = allPhotos.findIndex((p) => p.id === params.id);
  const nextPhotoId =
    currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1].id : null;
  const prevPhotoId = currentIndex > 0 ? allPhotos[currentIndex - 1].id : null;

  return (
    <div className="fixed inset-0 bg-stone-900/50 z-10 flex justify-center items-center">
      {/* Modal for the image */}
      <div className="relative">
        {prevPhotoId && (
          <Link
            scroll={false}
            replace
            href={`/photo/${prevPhotoId}`}
            className="bg-black h-full p-4 text-3xl text-white hover:bg-stone-500  hover:text-black font-bold transition"
          >
            &lt;
          </Link>
        )}
      </div>
      <Modal photo={photo} />

      {/* Next and Previous Buttons */}
      <div className="relative ">
        {nextPhotoId && (
          <Link
            replace
            scroll={false}
            href={`/photo/${nextPhotoId}`}
            className="bg-black h-full p-4 text-3xl text-white hover:bg-stone-500  hover:text-black font-bold transition"
          >
            &gt;
          </Link>
        )}
      </div>
    </div>
  );
};

export default ModalDetailPage;
