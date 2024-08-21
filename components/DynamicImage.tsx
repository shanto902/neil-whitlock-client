// components/DynamicImage.tsx
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
export type TSize = {
  height: number;
  width: number;
};
const DynamicImage = ({
  image,
  alt,
  className,
  blurDataURL,
  size,
}: {
  image: string;
  alt: string;
  className: string;
  blurDataURL: string;
  size?: TSize;
}) => {
  console.log(image);
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center",
        className
      )}
    >
      <Zoom>
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`}
          className={twMerge(!size && "object-cover ", "object-cover")}
          fill={!size && true}
          alt={alt || ""}
          placeholder="blur"
          blurDataURL={blurDataURL}
          {...size}
        />
      </Zoom>
    </div>
  );
};

export default DynamicImage;
