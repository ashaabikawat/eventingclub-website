"use client";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const CardWithText = ({ data }) => {
  const imageUrl = `${URL}/${data?.EventCardImages[0]?.image_path}`;

  return (
    <div>
      <div>
        {/* image */}
        <div>
          <Image
            src={`${imageUrl}`}
            alt="profile-picture"
            height={375}
            width={500}
            objectFit="cover"
            className="rounded"
          />
        </div>
      </div>

      {/* data */}
      <div className=" mt-2  mb-4">
        <div
          className={`flex items-center justify-start mb-2 ${
            data.EventName.length > 40 ? "mt-2 mb-2" : "mt-0 mb-0"
          } h-auto`}
        >
          <p
            className="capitalize md:text-base text-sm lg:text-lg font-bold line-clamp-2"
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

        <div className="flex flex-col gap ">
          <div className="flex gap-2 items-center justify-start">
            <span>
              <CalendarIcon className="size-4 lg:size-5 text-gray-800" />
            </span>
            <span className="md:text-sm font-Atkinson  text-xs lg:text-base text-center capitalize text-gray-900">
              {data.EventStartDate}
            </span>
          </div>

          <div className="flex gap-2 items-center justify-start">
            <span>
              <MapPinIcon className="size-4 lg:size-5 text-gray-900" />
            </span>
            <span className="md:text-sm text-xs lg:text-base  capitalize text-gray-900">
              {data.VenueName}
            </span>
          </div>
        </div>

        {data.LowestticketPrice !== null && (
          <div className="mt-2  ">
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
