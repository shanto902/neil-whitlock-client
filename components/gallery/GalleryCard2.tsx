import { TCategory } from "@/interface/category.interface";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const GalleryCard2 = ({ id, name, thumbnail, slug, shape }: TCategory) => {
  return (
    <Link
      href={`/gallery-2/${slug}`}
      className={twMerge("col-span-1", shape === "wide" && "col-span-3")}
    >
      <Image
        className=" aspect-square md:aspect-auto object-cover"
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${thumbnail}`}
        alt={name}
        height={500}
        width={shape === "wide" ? 1900 : 500}
      />
      <div className="text-white text-lg font-normal mt-5 tracking-widest">
        {name}
      </div>
    </Link>
  );
};

export default GalleryCard2;
