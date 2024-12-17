"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./ThumbButton";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "./styles.css";
import { TImageData } from "@/interface/pictures.interface";
import ImageDetail2 from "../gallery/ImageDetails2";
import Image from "next/image";
import arrowLeft from "@/public/assets/svg/arrow-left.svg";
import arrowRight from "@/public/assets/svg/arrow-right.svg";

type PropType = {
  slides: TImageData[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Ref to track if the scroll to #main has already occurred
  const hasScrolled = useRef(false);

  const updateUrl = useCallback(
    (id: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("image", id);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
      updateUrl(slides[index].id);
    },
    [emblaMainApi, emblaThumbsApi, slides, updateUrl]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const selectedSnap = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(selectedSnap);
    emblaThumbsApi.scrollTo(selectedSnap);
    updateUrl(slides[selectedSnap].id);
  }, [emblaMainApi, emblaThumbsApi, slides, updateUrl]);

  // Scroll to image in URL query param or first image
  useEffect(() => {
    if (!emblaMainApi) return;

    const imageId = searchParams.get("image");
    const imageIndex = slides.findIndex((slide) => slide.id === imageId);

    if (imageId && imageIndex !== -1) {
      emblaMainApi.scrollTo(imageIndex);
      setSelectedIndex(imageIndex);
    } else {
      // If no imageId or invalid, scroll to the first slide
      console.log("No valid imageId, defaulting to first slide.");
      emblaMainApi.scrollTo(0);
      setSelectedIndex(0);
    }
  }, [searchParams, emblaMainApi, slides]);

  useEffect(() => {
    if (!emblaMainApi) return;

    onSelect(); // Trigger selection on initialization

    if (!hasScrolled.current) {
      document.getElementById("main")?.scrollIntoView({ behavior: "smooth" });
      hasScrolled.current = true;
    }

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // Arrow Navigation Handlers
  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollPrev, scrollNext]);

  return (
    <div className="embla relative">
      {/* Main Slider */}
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className="embla__slide flex justify-center items-end"
              key={index}
            >
              <ImageDetail2 photo={slide} />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="embla-thumbs">
        <div
          className="embla-thumbs__viewport !max-h-[100px]"
          ref={emblaThumbsRef}
        >
          <div className="embla-thumbs__container">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                thumbnailSrc={`${process.env.NEXT_PUBLIC_ASSETS_URL}${slide.image}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrow Buttons */}
      <div className="relative">
        <button
          className={`absolute left-5 top-1/2 transform -translate-y-1/2 z-20 p-2 ${
            !emblaMainApi?.canScrollPrev() ? "opacity-30" : "opacity-100"
          }`}
          onClick={scrollPrev}
          disabled={!emblaMainApi?.canScrollPrev()} // Disable if no previous slide
        >
          <Image className="cursor-pointer" alt="Arrow Left" src={arrowLeft} />
        </button>
        <div className="relative mt-10 flex justify-center items-center font-thin">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
        <button
          className={`absolute right-5 top-1/2 transform -translate-y-1/2 z-20 p-2 ${
            !emblaMainApi?.canScrollNext() ? "opacity-30" : "opacity-100"
          }`}
          onClick={scrollNext}
          disabled={!emblaMainApi?.canScrollNext()} // Disable if no next slide
        >
          <Image
            className="cursor-pointer"
            alt="Arrow Right"
            src={arrowRight}
          />
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
