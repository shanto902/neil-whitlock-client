import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
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
    <>
      <NavBar />
      {children}
    </>
  );
}
