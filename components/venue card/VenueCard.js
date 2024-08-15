import { URL } from "@/utils/constants";
import Image from "next/image";
import React from "react";

export const VenueCard = ({ data }) => {
  const imageUrl = data?.Images?.[0]?.image_path;

  return (
    <div className="border border-gray-300 h-full w-full cursor-pointer rounded ">
      <div>
        <div className="relative h-80 w-full">
          <Image
            src={`${URL}/${imageUrl}`}
            alt="venue card"
            objectFit="cover"
            layout="fill"
            className="rounded"
            objectPosition="center"
          />
        </div>
        <div className="flex flex-col gap-4 justify-between  md:p-4  p-3">
          <h2 className="text-blue-900 font-bold md:text-2xl text-sm">
            {data.Name}
          </h2>
          <p className="text-sm">{data.Address}</p>
        </div>
      </div>
    </div>
  );
};
