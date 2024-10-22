"use client";
import { URL } from "@/utils/constants";
import Image from "next/image";

const Cards = ({ data }) => {
  const imageUrl = data?.Images[0].image_path;

  return (
    <div className="w-full h-full relative cursor-pointer overflow-hidden">
      {/* image */}
      <div>
        <Image
          src={`${URL}/${imageUrl}`}
          alt="profile-picture"
          objectFit="cover"
          height={375}
          width={500}
          className="rounded "
        />
      </div>

      {/* data */}
      <div className="absolute inset-x-4 bottom-4">
        <p className="text-white text-sm md:text-base">{data.Name}</p>
      </div>
    </div>
  );
};
export default Cards;
