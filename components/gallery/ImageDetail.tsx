"use client";
import { TImageData } from "@/interface/pictures.interface";
import Image from "next/image";
import { FC } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ImageDetailProps {
  photo: TImageData;
}

const ImageDetail: FC<ImageDetailProps> = ({ photo }) => {
  return (
    <div className="p-4">
      <div className="relative mx-auto">
        <Zoom>
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}`}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            className="object-contain"
            layout="responsive"
            priority
            placeholder="blur"
            blurDataURL={photo.blurDataURL as string}
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ImageDetail;
