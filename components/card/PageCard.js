"use client";
import { URL } from "@/utils/constants";
import { Card } from "@material-tailwind/react";
import Image from "next/image";

const PageCard = ({ data }) => {
  const imageUrl = data?.Images[0].image_path;

  return (
    <Card className="w-full md:h-64 h-52  relative cursor-pointer overflow-hidden">
      {/* <CardHeader floated={false} className="h-80"> */}
      <div className="w-full h-full relative  ">
        <Image
          src={`${URL}/${imageUrl}`}
          alt="profile-picture"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="rounded  "
        />
      </div>
      {/* </CardHeader> */}
      <div className="absolute inset-x-4 bottom-6">
        <p className="text-white text-sm md:text-base">{data.Name}</p>
      </div>
    </Card>
  );
};
export default PageCard;
