import { URL } from "@/utils/constants";
import Image from "next/image";
import React from "react";

export const VenueCard = ({ data }) => {
  const imageUrl = data?.Images?.[0]?.image_path;

  return (
    <div className="border border-gray-400 h-full w-full cursor-pointer rounded-lg overflow-hidden font-nunito ">
      <div>
        <div className="">
          <Image
            src={`${URL}/${imageUrl}`}
            alt="venue card"
            objectFit="cover"
            className="rounded"
            height={375}
            width={500}
          />
        </div>
        <div className="flex flex-col gap-2 justify-between  md:p-4  p-3">
          <h2 className="text-blue-900 font-bold md:text-xl text-sm capitalize">
            {data.Name}
          </h2>
          <p className="text-sm">{data.Address}</p>
        </div>
      </div>
    </div>
  );
};
