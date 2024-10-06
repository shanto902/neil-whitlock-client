"use client";
import Link from "next/link";

import PaddingContainer from "./layout/PaddingContainer";
import { categories } from "@/data/category";
import { usePathname } from "next/navigation";
import ScrollToTop from "./ScrollToTop";

const Footer = () => {
  const pathname = usePathname();
  const isGalleryPage =
    pathname.startsWith("/gallery/") && pathname !== "/gallery";

  return (
    <PaddingContainer className="relative lg:h-[300px] md:h-[390px] sm:h-[480px] h-[550px] flex flex-col items-center justify-center text-white gap-5">
      {isGalleryPage && (
        <nav className="w-full absolute top-0">
          <ul className="flex flex-wrap md:gap-x-10 md:gap-y-5 gap-x-5 gap-y-3 justify-center items-center tracking-wider uppercase text-sm font-normal px-4 sm:px-8 md:px-16 lg:px-20 mb-10">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/gallery/${category.slug}`}
                  className="hover:underline underline-offset-4 tracking-wider font-medium"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="w-full flex flex-col items-center">
        <nav>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center uppercase text-lg font-medium px-4 sm:px-8 md:px-16 lg:px-20">
            {[
              {
                name: "Home",
                link: "/",
              },
              { name: "Gallery", link: "/gallery" },
              {
                name: "About",
                link: "/about",
              },
              {
                name: "Print",
                link: "/print",
              },
              {
                name: "Contact",
                link: "/contact",
              },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  className="hover:underline underline-offset-4 tracking-widest font-medium"
                  href={`${link.link}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 uppercase text-gray-400 font-extralight text-xs text-center w-full px-4 sm:px-8">
          Copyright © 2024{" "}
          <span className=" font-semibold">Neill Whitlock</span> All rights
          reserved.. <br /> Developed by{" "}
          <a
            className="font-semibold"
            href="https://shantosworkshop.com"
            target="_blank"
          >
            Shanto&apos;s Workshop
          </a>
        </p>
      </div>
      <div className="absolute bottom-5 flex justify-center w-full">
        <ScrollToTop />
      </div>
    </PaddingContainer>
  );
};

export default Footer;
