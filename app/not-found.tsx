import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" h-screen flex flex-col justify-center items-center w-full gap-5">
      <h1 className=" text-9xl font-bold">404</h1>
      <h2 className=" text-4xl uppercase">Page Not Found</h2>

      <Link
        className=" bg-white text-black text-xl py-2 px-3 mt-10 font-semibold hover:text-white hover:bg-black transition-colors duration-300 uppercase"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
