"use client";
import { Card } from "@material-tailwind/react";
import Image from "next/image";

const Cards = ({ data }) => {
  // console.log(data);
  const imageUrl = data.Images[0].image_path;
  // console.log(imageUrl);

  return (
    // <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 w-full mt-8 ">
    <Card className="w-full h-52 relative">
      {/* <CardHeader floated={false} className="h-80"> */}
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${imageUrl}`}
        alt="profile-picture"
        layout="fill"
        objectFit="cover"
        className="rounded overflow-hidden"
      />
      {/* </CardHeader> */}
      <div className="absolute inset-x-4 bottom-6">
        <p className="text-white">alan walker</p>
      </div>
    </Card>
    // </div>
  );
};
export default Cards;
