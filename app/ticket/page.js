"use client";
import ShortTicket from "@/components/tickets/ShortTicket";
import { settings } from "@/utils/constants";
import React from "react";
import Slider from "react-slick";

const page = () => {
  const data = [
    {
      id: 1,
      day: "saturday",
      date: "13",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 2,
      day: "sunday",
      date: "14",
      month: "Oct",
      time: "1.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
  ];
  return (
    <div>
      <div className="md:p-8  ">
        <div>
          <h1 className="md:text-3xl capitalize text-blue-900 font-bold border-b-2 border-gray-200 pb-3   ">
            Suburn arena ft. alan walker - pune
          </h1>
          <div>
            <p className="capitalize mt-4 text-xl">Select date:</p>
            <div className="mt-4 w-full flex items-center justify-between">
              {/* <Slider {...settings}> */}
              {data.map((data) => (
                <div className="w-1/5">
                  <ShortTicket data={data} />
                </div>
              ))}
              {/* </Slider> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
