"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Print", path: "/print" },
    { name: "Contact", path: "/contact" },
  ];

  const getLinkClass = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path))
      ? "font-bold"
      : "font-normal";

  return (
    <main>
      <nav className="absolute px-8  bg-transparent z-10 top-0 left-1/2 transform -translate-x-1/2 h-20 flex md:flex-col md:my-5 lg:my-0 lg:flex-row justify-between items-center w-full container overflow-hidden">
        <div className="flex-1">
          <Link
            href={"/"}
            className="text-white lg:text-4xl md:text-3xl text-2xl whitespace-nowrap font-light tracking-[3.60px] uppercase"
          >
            Neill Whitlock
          </Link>
        </div>
        <div className="flex flex-1 w-full justify-end md:justify-center lg:justify-end">
          <ul className="uppercase hidden md:flex text-white gap-5">
            {links.map((link) => (
              <li
                key={link.path}
                className="group hover:bg-white duration-300 transition-all px-2"
              >
                <Link
                  className={`hover:underline underline-offset-4  text-sm font-medium tracking-wider group-hover:text-black ${getLinkClass(
                    link.path
                  )}`}
                  href={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-white" onClick={toggleNav}>
            {/* Add your hamburger menu icon here */}☰
          </button>
        </div>
      </nav>
      {/* Mobile Nav  */}
      <div
        className={`fixed lg:hidden top-0 right-0 h-full w-64 bg-stone-900 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleNav}
        >
          ✕
        </button>
        <ul className="uppercase flex flex-col text-white mt-20 gap-5 px-5">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={toggleNav}
              className="flex group items-center gap-3 duration-300 transition-all hover:bg-white px-2"
            >
              <span
                className={`${getLinkClass(
                  link.path
                )} flex-shrink-0  group-hover:text-black`}
              >
                {link.name}
              </span>
              <div className="flex items-center w-full">
                <hr className="flex-grow border-t-2 mt-[0.5px] border-white " />
                <span className="text-white opacity-0  group-hover:opacity-100 font-semibold text-xl group-hover:text-black ">
                  →
                </span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default NavBar;
