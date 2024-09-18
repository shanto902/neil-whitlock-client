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
    <>
      <nav className="absolute px-8 bg-transparent z-10 top-0 left-1/2 transform -translate-x-1/2 h-20 flex justify-between items-center w-full container">
        <div className="flex-1">
          <Link
            href={"/"}
            className="text-white lg:text-4xl md:text-3xl text-2xl whitespace-nowrap font-light tracking-[3.60px] uppercase"
          >
            Neill Whitlock
          </Link>
        </div>
        <div className="flex flex-1 w-full justify-end">
          <ul className="uppercase hidden md:flex text-white gap-5">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  className={`hover:underline underline-offset-4  text-sm font-medium tracking-wider ${getLinkClass(
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
      {/* Mobile navigation slider */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-stone-900 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleNav}
        >
          {/* Add your close icon here */}✕
        </button>
        <ul className="uppercase flex flex-col text-white mt-20 gap-5 px-5">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={getLinkClass(link.path)}
                onClick={toggleNav}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
