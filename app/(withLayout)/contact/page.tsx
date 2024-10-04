import Form from "@/components/Form";
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
    <div className=" container">
      <Form />
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${contactPageData.image}`}
        alt="Contact"
        className="object-cover absolute -z-10 inset-0 brightness-75"
        fill
      />
    </div>
  );
};

export default ContactPage;
