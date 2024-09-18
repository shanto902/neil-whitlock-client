import type { Metadata } from "next";

import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "NEILL WHITLOCK",
  description: "GALLERY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
