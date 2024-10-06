"use client";
import { TImageData } from "@/interface/pictures.interface";
import Image from "next/image";
import { FC, useState } from "react";
import clsx from "clsx";
import { RotatingSquare } from "react-loader-spinner";

interface ImageDetail2Props {
  photo: TImageData;
  className?: string;
}

const ImageDetail2: FC<ImageDetail2Props> = ({ photo, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Calculate aspect ratio as a percentage for padding-bottom
  const aspectRatio = (photo.height / photo.width) * 100;

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className={clsx(
            "absolute inset-0 flex flex-col justify-end items-center",
            isLoading ? "opacity-100" : "opacity-0 hidden", // For smooth transition
            "transition-opacity duration-300"
          )}
        >
          <RotatingSquare
            visible={true}
            height="100"
            width="100"
            color="#fff"
            ariaLabel="rotating-square-loading"
          />
          <h3 className="uppercase font-xl text-white mt-4">Loading</h3>
        </div>
      )}

      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}`}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        priority
        className={clsx(
          "object-contain lg:max-h-screen w-full transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageDetail2;
