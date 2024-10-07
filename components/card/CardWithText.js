"use client";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

const CardWithText = ({ data }) => {
  const imageUrl = `${URL}/${data?.EventCardImages[0]?.image_path}`;
  // console.log(imageUrl);

  return (
    <div>
      <Card className="w-full lg:h-[300px] md:h-[250px] h-[150px] relative cursor-pointer overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src={`${imageUrl}`}
            alt="profile-picture"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="rounded"
          />
        </div>
        <div className="absolute bottom-2 right-2"></div>
      </Card>

      <div className=" mt-2  mb-4">
        <div
          className={`flex items-center justify-start mb-2 ${
            data.EventName.length > 40 ? "mt-2 mb-2" : "mt-0 mb-0"
          } h-auto`}
        >
          <p
            className="capitalize md:text-base text-sm lg:text-lg font-semibold line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2, // Limit to 2 lines
            }}
          >
            {data.EventName}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-start">
            <span>
              <CalendarIcon className="size-4 lg:size-5 text-gray-800" />
            </span>
            <span className="md:text-sm text-sm lg:text-base text-center capitalize text-gray-900">
              {data.EventStartDate}
            </span>
          </div>

          <div className="flex gap-2 items-center justify-start">
            <span>
              <MapPinIcon className="size-4 lg:size-5 text-gray-900" />
            </span>
            <span className="md:text-sm text-sm lg:text-base  capitalize text-gray-900">
              {data.VenueName}
            </span>
          </div>
        </div>

        {data.LowestticketPrice !== null && (
          <div className="mt-4">
            <span className="text-sm md:text-base lg:text-lg font-semibold">
              &#8377; {data.LowestticketPrice} Onwards
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardWithText;
