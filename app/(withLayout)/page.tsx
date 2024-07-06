import HomeSlider from "@/components/home/HomeSlider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home | Neill Whitlock',
  description: '...',
}
export default function Home() {
  return (
    <>
      <HomeSlider />
    </>
  );
}
