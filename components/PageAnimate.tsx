"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import FrozenRoute from "./FrozenRoute";

const PageAnimatePresence = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Check if the pathname is exactly '/gallery' (root page) to skip animations
  const isRootGalleryPage = pathname === "/gallery";

  return (
    <div>
      {" "}
      {isRootGalleryPage ? (
        <div>{children}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={pathname}>
            <FrozenRoute>{children}</FrozenRoute>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PageAnimatePresence;
