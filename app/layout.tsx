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
  icons: {},
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <PageAnimatePresence>{children}</PageAnimatePresence>
      </body>
    </html>
  );
}
