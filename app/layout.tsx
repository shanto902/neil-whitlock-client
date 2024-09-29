import { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
const PageAnimatePresence = dynamic(() => import("@/components/PageAnimate"), {
  ssr: false, // This ensures the component is only rendered on the client
});
const montserrat = Montserrat({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "NEILL WHITLOCK",
  description: "Photography Website",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <PageAnimatePresence>{children}</PageAnimatePresence>
      </body>
    </html>
  );
}
