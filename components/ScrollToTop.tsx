import Image from "next/image";
import arrow from "@/public/assets/svg/arrow.svg";
const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };
  return (
    <Image
      className=" cursor-pointer"
      onClick={scrollToTop}
      alt="Scroll to top"
      src={arrow}
    />
  );
};

export default ScrollToTop;
