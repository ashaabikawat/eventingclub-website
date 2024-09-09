"use client";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";

const ShimmerCard = () => {
  return (
    <Card className="h-52 md:w-60 w-50 relative bg-gray-200 cursor-pointer overflow-hidden animate-pulse">
      <div className="w-60 h-full relative flex justify-center items-center ">
        <PhotoIcon className="size-6 md:size-10 " />
      </div>
    </Card>
  );
};

export default ShimmerCard;
