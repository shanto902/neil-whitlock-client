import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const PaddingContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge("mx-auto px-8 container overflow-hidden", className)}
    >
      {children}
    </div>
  );
};

export default PaddingContainer;
