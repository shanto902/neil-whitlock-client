import { ReactNode } from "react";

const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className="  mx-auto px-4">{children}</div>;
};

export default PaddingContainer;
