"use client";
import { URL } from "@/utils/constants";
import Image from "next/image";

const PageCard = ({ data }) => {
  const imageUrl = data?.Images[0].image_path;

  return (
    <div className="w-full h-full relative rounded cursor-pointer overflow-hidden">
      {/* image */}
      <div>
        <Image
          src={`${URL}/${imageUrl}`}
          alt="profile-picture"
          height={375}
          width={500}
          objectPosition=" top center"
          objectFit="cover"
          // layout="fill"
        />
      </div>

      {/* data */}
      <div className="absolute inset-x-4 bottom-4">
        <p className="text-white text-sm md:text-base">{data.Name}</p>
      </div>
    </div>
  );
};
export default PageCard;
