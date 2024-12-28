"use client";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PageCardWithText = ({ event }) => {
  const imageUrl = `${URL}/${event.EventCardImages[0]?.image_path}`;

  const eventNameRef = useRef(null);

  useEffect(() => {
    // Ensure this code runs only on the client (window is defined)
    if (typeof window !== "undefined") {
      const checkIfEventNameIsLong = () => {
        const element = eventNameRef.current;
        if (element) {
          const lineHeight = parseFloat(
            window.getComputedStyle(element).lineHeight
          );
          const lines = Math.ceil(element.scrollHeight / lineHeight);
          setIsLongEventName(lines > 2);
        }
      };
      checkIfEventNameIsLong();
      window.addEventListener("resize", checkIfEventNameIsLong);
      return () => window.removeEventListener("resize", checkIfEventNameIsLong);
    }
  }, []);

  return (
    <div className="font-Atkinson">
      {/* image */}
      <Link href={`/events/${event.event_id}`}>
        <div>
          <Image
            src={imageUrl}
            alt="profile-picture"
            objectFit="cover"
            height={375}
            width={500}
            className="rounded"
          />
        </div>
      </Link>

      {/* data */}
      <div className="px-2">
        <div className=" mt-2 h-auto  sm:mt-2 ">
          <p className="text-[16px] capitalize  font-semibold sm:text-base">
            {event.EventName}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-3 lg:mt-1">
          <div className="flex gap-2 items-center justify-start">
            <span>
              <CalendarIcon className="size-4 text-gray-900" />
            </span>
            <span className="text-xs md:text-sm lg:text-sm text-center capitalize text-gray-900">
              {event.EventStartDate}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <span>
              <MapPinIcon className="size-4 text-gray-900" />
            </span>
            <span className="text-xs md:text-sm  lg:text-sm capitalize text-gray-900 ">
              {event.VenueName}
            </span>
          </div>
        </div>
        <div className="mt-4">
          {event.LowestticketPrice && (
            <span className="text-sm  md:text-base   font-semibold ">
              &#8377; {event.LowestticketPrice} Onwards
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageCardWithText;
