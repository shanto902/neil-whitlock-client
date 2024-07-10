import { TCategory } from "@/interface/category.interface";
import Image from "next/image";
import Link from "next/link";

const GalleryCard = ({ id, name, image, slug }: TCategory) => {
  return (
    <Link href={`/gallery/${slug}`} className={`${id === 7 && "col-span-3"}`}>
      <Image
        className=" aspect-square md:aspect-auto object-cover"
        src={image}
        alt={name}
        height={500}
        width={id === 7 ? 1900 : 500}
      />
      <div className="text-white text-lg font-normal mt-5 tracking-widest">
        {name}
      </div>
    </Link>
  );
};

export default GalleryCard;
