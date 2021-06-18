import React from "react";
import Navbar from "../../components/Navbar/navbar";

const PageNotFound = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="text-center mt-20 font-extrabold text-9xl text-gray-500">
        PAGE NOT FOUND
      </div>
    </div>
  );
};

export default PageNotFound;
