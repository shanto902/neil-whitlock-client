import Form from "@/components/Form";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { Metadata } from "next";
import contactImage from "@/public/assets/contact-image.jpg";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Contact | Neill Whitlock",
  description: "Photography Website",
};
const page = () => {
  return (
    <PaddingContainer className="mt-20 relative flex justify-center items-start">
      <main className="flex flex-col md:flex-row gap-10 justify-items-start w-full">
        <div className="flex-1 md:w-1/2 flex justify-center items-center">
          <Form />
        </div>
        <div className="flex-1 self-end md:w-1/2">
          <Image
            src={contactImage}
            alt="Contact"
            className="object-contain md:h-[90vh]"
            placeholder="blur"
          />
        </div>
      </main>
    </PaddingContainer>
  );
};

export default page;
