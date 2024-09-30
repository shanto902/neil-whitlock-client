// components/PicturesBlock.tsx
"use client"; // This ensures the component is client-side
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";

const PicturesBlock = ({ pictures }: { pictures: any[] }) => {
  const getGridClass = () => {
    if (pictures.length === 1) return "grid-cols-1";
    else if (pictures.length === 2) return "grid-cols-2";
    else if (pictures.length === 3) return "grid-cols-2 lg:grid-cols-3";
    else if (pictures.length === 4) return "grid-cols-2 lg:grid-cols-4";
    else
      return `grid-cols-2 md:grid-cols-${Math.ceil(
        pictures.length / 2
      )} lg:grid-cols-${pictures.length}`;
  };
  return (
    <div className={`grid place-items-center gap-4 my-5 ${getGridClass()}`}>
      {pictures.map((picture: any) => (
        <Zoom key={picture.id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${picture.item.picture}`}
            alt={picture.alt || "About image"}
            width={picture.item.size === "wide" ? 1920 : 800}
            height={600}
            className={`object-cover  ${
              pictures.length === 1 ? "aspect-auto" : "aspect-[4/3]"
            }`}
          />
        </Zoom>
      ))}
    </div>
  );
};

export default PicturesBlock;
