import PaddingContainer from "@/components/layout/PaddingContainer";
import PageTitle from "@/components/PageTitle";
import TextBlock from "@/components/TextBlock";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { Metadata } from "next";
import PicturesBlock from "@/components/PicturesBlock"; // Import the client component

export const metadata: Metadata = {
  title: "ABOUT | NEILL WHITLOCK",
  description: "Biography of Neill Whitlock",
};

const page = async () => {
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

  console.log(result?.blocks?.item?.photos);

  return (
    <PaddingContainer className="mt-20 w-full">
      <PageTitle>ABOUT</PageTitle>

      {result?.blocks?.map((block: any) => {
        if (block.collection === "text_block") {
          return <TextBlock key={block.id} text={block?.item?.text} />;
        } else if (block.collection === "pictures_block") {
          // Render the client component for pictures
          return <PicturesBlock key={block.id} pictures={block.item.photos} />;
        } else {
          return <h2 key={block.id}>WTF</h2>;
        }
      })}
    </PaddingContainer>
  );
};

export default page;
