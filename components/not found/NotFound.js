import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex md:gap-8 mb-12 gap-2 h-full w-full items-center flex-col">
      <div className="relative w-60 h-60 sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[400px] xl:w-[700px] xl:h-[300px]">
        <Image
          src={"/9318694.jpg"}
          alt="Not found"
          layout="fill"
          objectFit="contain"
          className="absolute"
        />
      </div>
      <div className="text-center">
        <p className="md:text-2xl font-bold mb-2">No data available.</p>
        <p className="md:text-lg">
          Please adjust or reset the filters to view the content.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
