"use client";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

const PageCardWithText = ({ event }) => {
  const imageUrl = `${URL}/${event.EventCardImages[0].image_path}`;

  return (
    <div className="md:mb-4">
      <Card className=" md:h-60 h-40 relative cursor-pointer overflow-hidden ">
        <div className=" w-[100%] h-full relative  ">
          <Image
            src={imageUrl}
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
      <div className="">
        <div className="flex items-center justify-start md:h-20 h-14 lg:mb-0">
          <p className="capitalize text-xs md:text-base">{event.EventName}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-start">
            <span>
              <CalendarIcon className="size-4" />
            </span>
            <span className="text-xs  text-center capitalize">
              {event.EventStartDate}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <span>
              <MapPinIcon className="size-4" />
            </span>
            <span className="text-xs text-left md:text-center capitalize">
              {event.VenueName}
            </span>
          </div>
        </div>
        <div className="mt-4">
          {/* <span className="text-lg md:text-base">
                     &#8377; {data.price} Onwards
                   </span> */}
        </div>
      </div>
    </div>
  );
};

export default PageCardWithText;
