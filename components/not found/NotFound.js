import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="relative w-72 h-72 ">
        <Image
          src={"/9318694.jpg"}
          alt="Not found"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>
      <div>
        <p className="md:text-2xl font-bold mb-2">No data available.</p>
        <p className="md:text-lg">
          Please adjust or reset the filters to view the content.
        </p>
      </div>
      {/* <p>Not found</p> */}
    </div>
  );
};

export default NotFound;
