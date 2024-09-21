import { TCategory } from "@/interface/category.interface";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

const useCategories = async (): Promise<TCategory[]> => {
  try {
    const result = await directus.request(
      readItems("categories" as any, {
        fields: ["id", "name", "shape", "thumbnail", "slug"],
        sort: ["sort"],
        filter: {
          status: {
            _eq: "published",
          },
        },
      })
    );

    return result as TCategory[];
  } catch (error) {
    throw new Error("Categories Not Found");
  }
};

export default useCategories;
