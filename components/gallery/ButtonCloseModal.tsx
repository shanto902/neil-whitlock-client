"use client";
import { useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";

const ButtonCloseModal = ({}: {}) => {
  const router = useRouter();

  const handleClick = () => {
    router.back(); // Navigate back
  };

  return (
    <div
      onClick={handleClick}
      className="absolute top-0 right-0 p-4 cursor-pointer bg-black   text-3xl text-white hover:bg-stone-500  hover:text-black font-bold transition z-20"
    >
      <CgClose className="w-10 h-10" />
    </div>
  );
};

export default ButtonCloseModal;
