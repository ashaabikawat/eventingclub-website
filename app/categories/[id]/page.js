"use client";

import Filter from "@/components/filter/Filter";
import { categories } from "@/utils/config";
import { URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const payload = {
      category_id: id,
    };
    try {
      const response = await axios.post(categories.GET_BY_ID, payload);
      console.log(response.data.data);
      setEvents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-full grid md:grid-cols-[300px_minmax(400px,_1fr)_100px] ">
        <div className=" w-2/3 h-full">
          <Filter />
        </div>
        <div className=" w-full h-full hidden md:block">
          <div className="grid md:grid-cols-3 gap-4">
            {events?.map((event) => {
              const imageUrl = `${URL}/${event.EventCardImages[0].image_path}`;
              console.log(imageUrl);
              return (
                <div>
                  <Card className="w-full h-60 relative cursor-pointer overflow-hidden ">
                    <div className="w-full h-full relative  ">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
