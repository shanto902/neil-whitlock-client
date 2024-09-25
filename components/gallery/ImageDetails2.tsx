import { TImageData } from "@/interface/pictures.interface";
import Image from "next/image";
import { FC } from "react";

interface ImageDetail2Props {
  photo: TImageData;
}

const ImageDetail2: FC<ImageDetail2Props> = ({ photo }) => {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}`}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      className="object-contain max-h-[82dvh] mb-5 aspect-auto"
      placeholder="blur"
      blurDataURL={photo.blurDataURL as string}
    />
  );
};

export default ImageDetail2;
