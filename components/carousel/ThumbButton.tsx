import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  thumbnailSrc: string; // Add thumbnail image prop
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, thumbnailSrc } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={clsx(
        "embla-thumbs__slide",
        selected && "embla-thumbs__slide--selected"
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button relative" // Added relative positioning
        style={{ width: "100%", height: "100%" }} // Ensure full width and height
      >
        {/* Loading animation overlay */}

        {isLoading && (
          <div
            className="absolute inset-0 animate-pulse bg-stone-700 z-10" // Absolute positioned to cover image
            style={{
              aspectRatio: "4 / 3", // Maintain aspect ratio
            }}
          ></div>
        )}

        {/* Image component */}
        <Image
          height={300}
          width={300}
          src={thumbnailSrc}
          alt={`Thumbnail for slide ${index + 1}`}
          className={clsx(
            "embla-thumbs__slide__img aspect-[4/2.9] object-center object-cover transition-opacity duration-300",
            isLoading ? "opacity-0 border-none" : "opacity-100",
            selected ? "opacity-100 border-2 border-white" : "opacity-50"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </button>
    </div>
  );
};
