"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./ThumbButton";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "./styles.css";
import { TImageData } from "@/interface/pictures.interface";
import ImageDetail2 from "../gallery/ImageDetails2";

type PropType = {
  slides: TImageData[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const updateUrl = useCallback(
    (id: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("image", id);
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
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

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    const imageId = searchParams.get("image");
    if (imageId && emblaMainApi) {
      const imageIndex = slides.findIndex((slide) => slide.id === imageId);
      if (imageIndex !== -1) {
        emblaMainApi.scrollTo(imageIndex);
        setSelectedIndex(imageIndex);
      }
    }
  }, [searchParams, emblaMainApi, slides]);

  useEffect(() => {
    const handlePopState = () => {
      router.replace("/gallery/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // Add keyboard navigation functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!emblaMainApi) return;
      if (event.key === "ArrowRight") {
        emblaMainApi.scrollNext(); // Scroll to the next slide
      } else if (event.key === "ArrowLeft") {
        emblaMainApi.scrollPrev(); // Scroll to the previous slide
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaMainApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className="embla__slide flex justify-center items-center"
              key={index}
            >
              <ImageDetail2 photo={slide} />
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default EmblaCarousel;
