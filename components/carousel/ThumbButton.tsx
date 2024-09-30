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
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button"
      >
        {/* Display thumbnail image instead of index */}
        {isLoading && (
          <div
            className="animate-pulse bg-stone-700  aspect-[4/3]"
            style={{
              paddingBottom: `${4 / 3}%`, // This keeps the aspect ratio
              width: "100%", // Full width of the container
            }}
          ></div>
        )}
        <Image
          height={300}
          width={300}
          src={thumbnailSrc}
          alt={`Thumbnail for slide ${index + 1}`}
          className={clsx(
            "embla-thumbs__slide__img aspect-[4/3] object-center object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            selected ? "opacity-100 border-2 border-white" : "opacity-50"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </button>
    </div>
  );
};
