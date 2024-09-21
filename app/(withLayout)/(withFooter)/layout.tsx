import type { Metadata } from "next";

import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "NEILL WHITLOCK",
  description: "GALLERY",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div>{modal}</div>
      <Footer />
    </>
  );
}
