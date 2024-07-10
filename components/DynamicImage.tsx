// components/DynamicImage.tsx
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export type TSize = {
  height: number;
  width: number;
};
const DynamicImage = ({
  url,
  alt,
  className,
  blurDataURL,
  size,
}: {
  url: string;
  alt: string;
  className: string;
  blurDataURL: string;
  size?: TSize;
}) => {
  return (
    <div className={twMerge("relative", className)}>
      <Image
        src={url}
        className={` ${!size && "object-cover"} `}
        fill={!size && true}
        alt={alt || ""}
        placeholder="blur"
        blurDataURL={blurDataURL}
        {...size}
      />
    </div>
  );
};

export default DynamicImage;
