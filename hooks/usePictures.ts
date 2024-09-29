import directus from "@/lib/directus";
import { readFile, readItems } from "@directus/sdk";
import { useState, useEffect } from "react";

type TImageData = {
  id: number;
  image: string;
  alt: string;
  category: { slug: string };
  width: number;
  height: number;
};

const getPictures = async (slug: string) => {
  try {
    const result = await directus.request(
      readItems("pictures", {
        filter: {
          status: {
            _eq: "published",
          },
          category: {
            slug: {
              _eq: slug,
            },
          },
        },
        fields: ["id", "image", "alt", "category.slug"],
        sort: ["sort"],
      })
    );

    const newResult = await Promise.all(
      result.map(async (picture) => {
        const fileData = await directus.request(
          readFile(picture.image, {
            fields: ["width", "height"],
          })
        );
        return {
          ...picture,
          width: fileData.width,
          height: fileData.height,
        };
      })
    );

    return newResult as TImageData[];
  } catch (error) {
    console.error("Error fetching picture data:", error);
    throw new Error("Error fetching pictures");
  }
};

const usePictures = (slug: string) => {
  const [pictures, setPictures] = useState<TImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        setLoading(true);
        const data = await getPictures(slug);
        setPictures(data as TImageData[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, [slug]);

  return { pictures, loading, error };
};

export default usePictures;
