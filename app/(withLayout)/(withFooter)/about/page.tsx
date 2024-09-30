// imports
import PaddingContainer from "@/components/layout/PaddingContainer";
import PageTitle from "@/components/PageTitle";
import TextBlock from "@/components/TextBlock";
import directus from "@/lib/directus";
import { readFile, readSingleton } from "@directus/sdk";
import { Metadata } from "next";
import PicturesBlock from "@/components/PicturesBlock"; // Import the client component

export const metadata: Metadata = {
  title: "ABOUT | NEILL WHITLOCK",
  description: "Biography of Neill Whitlock",
};

// Define types for blocks
type TextBlock = {
  id: string;
  collection: "text_block";
  item: {
    text: string;
  };
};

type Picture = {
  item: any;
  id: string;
  image: string;
  width?: number;
  height?: number;
};

type PicturesBlockType = {
  id: string;
  collection: "pictures_block";
  item: {
    photos: Picture[];
  };
};

type Block = TextBlock | PicturesBlockType;

// Function to fetch image dimensions by image ID
const fetchImageDimensions = async (imageId: string) => {
  try {
    const fileData = await directus.request(
      readFile(imageId, {
        fields: ["width", "height"],
      })
    );
    return {
      width: fileData.width,
      height: fileData.height,
    };
  } catch (error) {
    console.error(`Failed to fetch dimensions for image ${imageId}:`, error);
    return { width: undefined, height: undefined };
  }
};

// Fetch the page data from Directus and enhance with image dimensions
const fetchAboutPage = async () => {
  try {
    const result = await directus.request(
      readSingleton("about_page", {
        fields: [
          "*",
          {
            blocks: [
              "*",
              {
                item: {
                  text_block: ["*"],
                  pictures_block: [
                    "*",
                    {
                      photos: [
                        "*",
                        {
                          item: ["*"],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      })
    );

    // For each block, fetch additional data for images in the pictures block
    const blocksWithImageDimensions = await Promise.all(
      result?.blocks?.map(async (block: any) => {
        if (block.collection === "pictures_block") {
          // Fetch image dimensions for each photo
          const photosWithDimensions = await Promise.all(
            block.item.photos.map(async (picture: Picture) => {
              const fileData = await fetchImageDimensions(picture.item.picture);
              return {
                ...picture,
                width: fileData.width,
                height: fileData.height,
              };
            })
          );
          return {
            ...block,
            item: { ...block.item, photos: photosWithDimensions },
          };
        }

        return block;
      })
    );

    return blocksWithImageDimensions as Block[];
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return [];
  }
};

// Helper function to render the blocks
const renderBlock = (block: Block) => {
  switch (block.collection) {
    case "text_block":
      return <TextBlock key={block.id} text={block.item.text} />;
    case "pictures_block":
      return <PicturesBlock key={block.id} pictures={block.item.photos} />;
    default:
      return <h2>Unknown Block Type</h2>;
  }
};

const AboutPage = async () => {
  const blocks = await fetchAboutPage(); // Fetch data

  return (
    <PaddingContainer className="mt-20 w-full">
      <PageTitle>ABOUT</PageTitle>
      {blocks?.map((block) => renderBlock(block))} {/* Render blocks */}
    </PaddingContainer>
  );
};

export default AboutPage;
