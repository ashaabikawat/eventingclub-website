import { URL } from "@/utils/constants";
import Image from "next/image";
import React from "react";

export const SingleArtistCard = ({ data }) => {
  const imageUrl = data?.Images?.[0]?.image_path;

  return (
    <div className="border border-gray-400 h-full w-full cursor-pointer rounded nunito ">
      <div>
        {/* <div className="md:h-80 h-72 w-full relative"> */}
        <div>
          <Image
            src={`${URL}/${imageUrl}`}
            alt="venue card"
            height={375}
            width={500}
            objectPosition="top"
            // layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-4 justify-between  md:p-4  p-3">
          <h2 className="text-blue-900 font-bold md:text-xl text-sm capitalize">
            {data.Name}
          </h2>
        </div>
      </div>
    </div>
  );
};
