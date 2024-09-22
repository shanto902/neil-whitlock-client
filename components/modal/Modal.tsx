"use client";
import { useEffect, useState } from "react";
import "./styles.css";
import { TImageData } from "@/interface/pictures.interface";
import Image from "next/image";
import { calculateImageSize } from "@/lib/calculateImageSize";
import ButtonCloseModal from "../gallery/ButtonCloseModal";

const Modal = ({ photo }: { photo: TImageData }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = calculateImageSize(photo.width, photo.height);
      setImageSize({ width, height });
    };

    // Set initial size
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [photo.width, photo.height]);
  return (
    <div>
      <div className="modal-content bg-contain">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${photo.image}`}
          width={imageSize.width}
          height={imageSize.height}
          alt={photo.alt}
          style={{ objectFit: "contain" }}
          className="object-contain image-contain"
          placeholder="blur"
          blurDataURL={photo.blurDataURL as string}
        />
      </div>
      <ButtonCloseModal />
    </div>
  );
};

export default Modal;
