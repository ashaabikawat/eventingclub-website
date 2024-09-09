"use client";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

const CardWithText = ({ data }) => {
  const imageUrl = `${URL}/${data?.EventCardImages[0]?.image_path}`;

  return (
    <>
      <Card className="w-full h-52 relative cursor-pointer overflow-hidden  ">
        <div className="w-full h-full relative  ">
          <Image
            src={`${imageUrl}`}
            alt="profile-picture"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="rounded"
          />
        </div>
        <div className="absolute bottom-2 right-2">
          {/* <p
            className={`${
              data.fastSelling
                ? "text-xs text-black bg-white rounded-md p-2"
                : ""
            }`}
          >
            {data.fastSelling ? "Fast selling " : ""}
          </p> */}
        </div>
      </Card>
      <div className="mt-4">
        <div className="flex items-center justify-start mb-2 h-14">
          <p className="capitalize md:text-lg  text-base">{data.EventName}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-start">
            <span>
              <CalendarIcon className="size-4 text-gray-700" />
            </span>
            <span className="md:text-sm text-sm text-center capitalize text-gray-700">
              {data.EventStartDate}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <span>
              <MapPinIcon className="size-4 text-gray-700" />
            </span>
            <span className="md:text-sm text-sm text-center capitalize text-gray-700">
              {data.VenueName}
            </span>
          </div>
        </div>
        {data.LowestticketPrice !== null && (
          <div className="mt-4">
            <span className="text-sm md:text-base">
              &#8377; {data.LowestticketPrice} Onwards
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CardWithText;
