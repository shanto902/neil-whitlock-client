"use client";
import { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="absolute bg-transparent z-10 top-0 left-1/2 transform -translate-x-1/2 h-20 flex max-w-[1550px] justify-between items-center px-10 w-full">
        <div className="flex-1">
          <div className="text-white lg:text-4xl md:text-3xl text-2xl whitespace-nowrap font-light tracking-[3.60px] uppercase ">
            Neill Whitlock
          </div>
        </div>
        <div className="flex flex-1 w-full justify-end">
          <ul className="uppercase hidden md:flex text-white gap-5">
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
          <li>
            <Link href={"/"} onClick={toggleNav}>
              Home
            </Link>
          </li>
          <li>
            <Link href={"/gallery"} onClick={toggleNav}>
              Gallery
            </Link>
          </li>
          <li>
            <Link href={"/about"} onClick={toggleNav}>
              About
            </Link>
          </li>
          <li>
            <Link href={"/print"} onClick={toggleNav}>
              Print
            </Link>
          </li>
          <li>
            <Link href={"/contact"} onClick={toggleNav}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
