"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="h-screen flex flex-col justify-center items-center w-full gap-5 ">
          <h2 className="text-4xl uppercase">Something went wrong!</h2>
          <button
            className=" bg-white text-black text-xl py-2 px-3 mt-10 font-semibold hover:text-white hover:bg-black transition-colors duration-300 uppercase"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
