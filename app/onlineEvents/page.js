"use client";
import CardWithText from "@/components/card/CardWithText";
import Filter from "@/components/filter/Filter";
import { getAllOnlineEvents } from "@/utils/config";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [onlineEvents, setOnlineEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(getAllOnlineEvents);
      console.log(response.data.data);
      setOnlineEvents(response.data.data);
    } catch (error) {}
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-full grid md:grid-cols-2">
        <div className=" w-full h-full">
          <Filter />
        </div>
        <div className="bg-blue-500 w-full h-full hidden md:block">
          {onlineEvents?.map((event) => {
            console.log(`${URL}/${event.EventCarouselImages[0].image_path}`);
            return (
              <>
                <Card className="w-full h-60 relative cursor-pointer overflow-hidden ">
                  <div className="w-full h-full relative  ">
                    <Image
                      src={`${URL}/${event.EventCarouselImages[0].image_path}.jpg`}
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
                <div className="mt-5">
                  <div className="flex items-center justify-start mb-3">
                    {/* <p className="capitalize md:text-base text-xl">{data.name}</p> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center justify-start">
                      <span>
                        <CalendarIcon className="size-5" />
                      </span>
                      {/* <span className="md:text-base text-xl text-center capitalize">
                      {data.date}
                    </span> */}
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                      <span>
                        <MapPinIcon className="size-5" />
                      </span>
                      {/* <span className="md:text-base text-xl text-center capitalize">
                      {data.location}
                    </span> */}
                    </div>
                  </div>
                  <div className="mt-4">
                    {/* <span className="text-lg md:text-base">
                    &#8377; {data.price} Onwards
                  </span> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
