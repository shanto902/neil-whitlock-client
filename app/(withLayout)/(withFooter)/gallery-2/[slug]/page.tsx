import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { redirect } from "next/navigation"; // Import the redirect function

// Generate static params for dynamic routes
export async function generateStaticParams() {
  try {
    const categories = await directus.request(
      readItems("categories", {
        fields: ["id", "slug"], // Include 'slug' in the fields to fetch
      })
    );
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    throw new Error("Error fetching categories");
  }
}
// Fetch the URL based on the slug
const getUrl = async (slug: string) => {
  try {
    const result = await directus.request(
      readItems("pictures", {
        fields: ["id", "category.slug"],
        filter: {
          category: {
            slug: {
              _eq: slug,
            },
          },
        },
        sort: ["sort"], // Ensure sorting is applied
        limit: 1, // Fetch only the first image (if needed)
      })
    );

    // Return the first result
    return result.length > 0 ? (result[0] as { id: string }) : null;
  } catch (error) {
    console.error("Error fetching photos", error);
  }
};

// Page component for handling redirection
const Page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  // Fetch the first image URL using the slug
  const url = await getUrl(params.slug);

  console.log({ url: url });
  // If the URL is found, redirect the user to the photo's page
  if (url) {
    redirect(`/gallery-2/${params.slug}/${url.id}`);
  }

  // If no URL is found, return a fallback UI (or handle the error appropriately)
  return (
    <div className="flex items-center justify-center h-screen">
      <h1>No photos found for this category.</h1>
    </div>
  );
};

export default Page;
