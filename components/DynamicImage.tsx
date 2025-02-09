// components/DynamicImage.tsx
import Image from "next/image";
import { twMerge } from "tailwind-merge";

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
  isCover = false,
}: {
  image: string;
  alt: string;
  className: string;
  blurDataURL: string;
  size?: TSize;
  isCover?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center",
        className
      )}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`}
        className={` ${
          isCover ? "object-cover" : "object-contain"
        } aspect-video`}
        fill={!size && true}
        alt={alt || ""}
        placeholder="blur"
        blurDataURL={blurDataURL}
        {...size}
        priority
      />
    </div>
  );
};

export default DynamicImage;
