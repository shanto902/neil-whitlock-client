"use client"; // Make sure to use "use client" for components that use hooks

import { usePathname } from "next/navigation";

const SelectedImage = ({ id }: { id: string }) => {
  const pathname = usePathname(); // Use usePathname to get the current path

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean); // filter(Boolean) to remove empty segments

  // Get the last segment of the path
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <>
      {lastSegment === id ? ( // Use a conditional rendering expression
        <div className="bg-stone-800/80 glass absolute inset-0 w-full h-full z-30">
          {/* Optionally, display the last segment */}{" "}
        </div>
      ) : null}{" "}
      {/* Render null if the condition is false */}
    </>
  );
};

export default SelectedImage;
