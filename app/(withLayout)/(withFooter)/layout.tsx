import type { Metadata } from "next";

import Footer from "@/components/Footer";
import React from "react";
export const metadata: Metadata = {
  title: "NEILL WHITLOCK",
  description: "GALLERY",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
