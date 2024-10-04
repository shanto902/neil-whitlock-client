import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import React from "react";
export const metadata: Metadata = {
  title: "NEILL WHITLOCK",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      <div>{children}</div>
    </main>
  );
}
