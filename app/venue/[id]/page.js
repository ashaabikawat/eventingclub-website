import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full ">
      <div className=" w-full h-full  ">
        <div className=" w-full h-full  lg:border-b-2 lg:border-gray-200 ">
          <div className="relative w-full h-52 md:mb-8 mb-6">
            <Image
              alt="venue"
              src={"/pic.jpg"}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex justify-between lg:gap-20 md:gap-2 lg:flex-row flex-col px-4   ">
            <div className="  w-full border-b-2 border-gray-300 lg:border-none  md:border-none ">
              <h1 className="lg:text-2xl md:text-xl  font-bold capitalize mb-4 text-blue-900">
                st. andrews auditorium :mumbai
              </h1>
              <p className="mb-4 md:text-base text-xs">
                E-27, Apmc Market-2, Phase-2, Dana Bunder, Vashi, Navi Mumbai
              </p>
              <p className="md:mb-6 mb-4 text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                eveniet dolores facilis voluptates? Aliquid placeat eaque
                laborum error nesciunt necessitatibus eius a quibusdam vero
                soluta?
              </p>
            </div>
            <div className="bg-orange-500 w-3/4 mt-4">
              <p>map</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
