import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] ">
      <div className="relative md:h-[500px] md:w-[500px] h-[200px] ">
        <Image
          src={"/9318694.jpg"}
          alt="Not found"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>
      <div>
        <p className="text-2xl font-bold mb-2">No data available.</p>
        <p className="text-lg">
          Please adjust or reset the filters to view the content.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
