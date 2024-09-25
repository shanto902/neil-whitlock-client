import { TImageData } from "@/interface/pictures.interface";
import Image from "next/image";
import "react-medium-image-zoom/dist/styles.css";
const ZoomImage = ({
  image,
  className,
}: {
  image: TImageData;
  className?: string;
}) => {
  return (
    <Image
      className={`mb-5 object-contain aspect-auto`}
      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image.image}`}
      alt={image.alt}
      height={image.height}
      width={image.width}
      // placeholder="blur"
      // blurDataURL={image.blurDataURL}
    />
  );
};

export default ZoomImage;
