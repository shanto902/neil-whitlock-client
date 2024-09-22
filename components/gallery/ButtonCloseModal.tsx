"use client";
import { useRouter } from "next/navigation";

const ButtonCloseModal = ({}: {}) => {
  const router = useRouter();

  const handleClick = () => {
    router.back(); // Navigate back
  };

  return (
    <div
      onClick={handleClick}
      className="absolute top-4 right-4 cursor-zoom-out h-full w-full  -z-10"
    ></div>
  );
};

export default ButtonCloseModal;
