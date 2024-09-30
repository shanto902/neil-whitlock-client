import Form from "@/components/Form";
import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Contact | Neill Whitlock",
  description: "Photography Website",
};
const ContactPage = async () => {
  const contactPageData = await directus.request(readSingleton("contact_page"));

  return (
    <PaddingContainer className="mt-20 relative flex justify-center items-start">
      <main className="flex flex-col md:flex-row gap-10 justify-items-start w-full">
        <div className="flex-1 md:w-1/2 flex justify-center items-center">
          <Form />
        </div>
        <div className="flex-1 self-end md:w-1/2">
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${contactPageData.image}`}
            alt="Contact"
            className="object-contain md:h-[90vh]"
            width={600}
            height={1000}
          />
        </div>
      </main>
    </PaddingContainer>
  );
};

export default ContactPage;
