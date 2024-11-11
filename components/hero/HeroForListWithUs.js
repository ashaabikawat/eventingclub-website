import Image from "next/image";
import React from "react";

const HeroForListWithUs = () => {
  return (
    <div className="h-full w-full">
      <div className="w-full md:h-[500px] h-[300px]  relative">
        <Image
          src={"/banner.jpg"}
          alt="Hero for List with Us"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>
    </div>
  );
};

export default HeroForListWithUs;
