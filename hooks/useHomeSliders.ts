import { TSlider } from "@/interface/homeSlider.interface";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { cache } from "react";

const useHomeSliders = cache(async (): Promise<TSlider[]> => {
  try {
    const result = await directus.request(
      readItems("homeSlider" as any, {
        fields: ["id", "title", "picture", "url"],
        sort: ["sort"],
        filter: {
          status: {
            _eq: "published",
          },
        },
      })
    );

    return result as TSlider[];
  } catch (error) {
    throw new Error("HomeSlider Not Found");
  }
});

export default useHomeSliders;
