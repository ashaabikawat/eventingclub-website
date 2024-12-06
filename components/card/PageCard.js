"use client";
import { URL } from "@/utils/constants";
import Image from "next/image";

const PageCard = ({ data }) => {
  const imageUrl = data?.Images[0].image_path;

  return (
    <div className="w-full h-full nunito rounded cursor-pointer overflow-hidden border border-gray-300 p-4 ">
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
      <div className="">
        <p className="text-black text-sm md:text-lg font-semibold mt-2 text-center capitalize">
          {data.Name}
        </p>
      </div>
    </div>
  );
};
export default PageCard;
