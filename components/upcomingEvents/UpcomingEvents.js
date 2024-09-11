"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import CardWithText from "../card/CardWithText";
import { dateFilter, initialLength, settings } from "@/utils/constants";
import axios from "axios";
import { getAllUpcomingEvents, upcomingEvents } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const UpcomingEvents = () => {
  const [allUpcomingEvents, setAllUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterEvents = async (value) => {
    const currentDate = new Date();
    let TodayStartDateTimeStr, TodayEndDatetimeStr;
    switch (value) {
      case "All":
        console.log("all");
        break;

      case "This Week":
        ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
          dateFilter("This weekend"));
        break;

      case "This Month":
        ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
          dateFilter("This month"));
        break;
      default:
        TodayStartDateTimeStr = null;
        TodayEndDatetimeStr = null;
    }
    DateFilterApiCall(TodayStartDateTimeStr, TodayEndDatetimeStr);
  };

  const DateFilterApiCall = async (startDate, endDate) => {
    // console.log(startDate, endDate);
    if (
      startDate === "Invalid date+00:00" ||
      endDate === "Invalid date+00:00"
    ) {
      toast.error("Please select date range");
      return;
    }

    try {
      const payload = {
        startDate: startDate,
        endDate: endDate,
      };

      // console.log({ payload });

      const response = await axios.post(`${upcomingEvents.GET_ALL}`, payload);

      if (response.data.data.length < 1) {
        toast.error(response.data.message);
      } else {
        setAllUpcomingEvents(response.data.data);
      }

      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          // console.log(error.response);
          toast.error(data.message);
          setEvents([]);
        }
      }
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await axios.post(upcomingEvents.GET_ALL);
      // console.log(response.data.data);
      setAllUpcomingEvents(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cardsData = allUpcomingEvents.slice(0, 8);

  return (
    <div className="w-full sm:px-8 md:px-14  px-6  mb-2 overflow-hidden">
      <Toaster />
      <div className="flex md:mt-0  md:flex-row flex-col justify-between">
        <h1 className="capitalize text-base md:text-2xl font-bold">
          Upcoming Events
        </h1>
        <div className="flex md:gap-12 gap-6 md:mt-0 mt-4 md:text-lg  sm:text-sm text-xs ">
          <span className="cursor-pointer" onClick={() => filterEvents("All")}>
            All
          </span>
          <span
            className="cursor-pointer"
            onClick={() => filterEvents("This Week")}
          >
            This Week
          </span>
          <span
            className="cursor-pointer"
            onClick={() => filterEvents("This Month")}
          >
            This month
          </span>
          <span className="text-blue-900">
            <Link href="/upcomingEvents">view all</Link>
          </span>
        </div>
      </div>
      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="mt-8">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className=" px-2 mt-6  h-96">
                <CardWithText data={data} />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default UpcomingEvents;
