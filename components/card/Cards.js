"use client";
import { URL } from "@/utils/constants";
import Image from "next/image";

const Cards = ({ data }) => {
  const imageUrl = data?.Images[0].image_path;

  return (
    <div className="w-full h-full cursor-pointer flex justify-center items-center flex-col  overflow-hidden">
      {/* image */}
      <Image
        src={`${URL}/${imageUrl}`}
        alt="profile-picture"
        objectFit="cover"
        height={100}
        width={100} // Remove width prop for automatic sizing
        className="rounded-md" // Apply rounded-full directly to Image component
      />

      {/* data */}
      <div className="flex justify-center items-center mt-2">
        <p className=" text-xs text-center md:text-sm font-semibold">
          {data.Name}
        </p>
      </div>
    </div>
  );
};

export default Cards;
