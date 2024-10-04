"use client";
import { RotatingSquare } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#fff"
        ariaLabel="rotating-square-loading"
      />
      <h3 className="uppercase font-xl text-white mt-4">Loading</h3>
    </div>
  );
};

export default Loading;
