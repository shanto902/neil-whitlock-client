import { TCategory } from "@/interface/category.interface";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const GalleryCard = ({ id, name, thumbnail, slug, shape }: TCategory) => {
  return (
    <Link
      href={`/gallery/${slug}`}
      className={twMerge(
        "col-span-1 group",
        shape === "wide" ? "col-span-3" : "",
        shape === "rectangle" ? "col-span-2" : ""
      )}
    >
      <Image
        className=" aspect-square md:aspect-auto object-cover h-[400px]"
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${thumbnail}`}
        alt={name}
        height={500}
        width={shape === "wide" ? 1900 : shape === "rectangle" ? 1000 : 500}
      />
      <div className="text-white flex  justify-between text-lg font-normal mt-5 tracking-widest">
        <p>{name}</p>{" "}
        <span className="group-hover:opacity-100 opacity-0 duration-300 transition-all -translate-x-5 group-hover:translate-x-0">
          →
        </span>
      </div>
    </Link>
  );
};

export default GalleryCard;
