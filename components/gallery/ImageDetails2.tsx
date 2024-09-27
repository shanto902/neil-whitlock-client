"use client";
import { TImageData } from "@/interface/pictures.interface";
import Image from "next/image";
import { FC, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface ImageDetail2Props {
  photo: TImageData;
}
const ImageDetail2: FC<ImageDetail2Props> = ({ photo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Calculate aspect ratio as a percentage for padding-bottom
  const aspectRatio = (photo.height / photo.width) * 100;

  return (
    <div className="relative">
      {isLoading && (
        <div
          className="animate-pulse bg-stone-700"
          style={{
            paddingBottom: `${aspectRatio}%`, // This keeps the aspect ratio
            width: "100%", // Full width of the container
          }}
        ></div>
      )}

      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}`}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        className={clsx(
          "object-contain lg:max-h-[82dvh]  w-full transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        // blurDataURL={photo.blurDataURL}
        // placeholder="blur"
      />
    </div>
  );
};

export default ImageDetail2;
