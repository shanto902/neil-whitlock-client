import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import arrow from "@/public/assets/svg/arrow.svg";
const WithFooterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className=" relative  h-[450px] flex flex-col justify-center items-center text-white gap-5">
      <nav className="flex flex-row space-x-8">
        <ul className="flex space-x-8 uppercase text-lg font-medium">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/gallery"}>Gallery</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/print"}>Print</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </nav>
      <p className="mt-4 uppercase text-gray-400">
        All content Copyright © 2023 Neill Whitlock{" "}
      </p>
      <div className="absolute bottom-5 flex justify-center w-full">
        <Image alt="Scroll to top" src={arrow} />
      </div>
    </section>
  );
};

export default WithFooterLayout;
