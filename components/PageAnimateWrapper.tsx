"use client";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
const PageAnimatePresence = dynamic(() => import("@/components/PageAnimate"), {
  ssr: false, // This ensures the component is only rendered on the client
});

const PageAnimateWrapper = ({ children }: { children: ReactNode }) => {
  return <PageAnimatePresence>{children}</PageAnimatePresence>;
};

export default PageAnimateWrapper;
