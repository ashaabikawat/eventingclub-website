"use client";
import React, { useEffect, useState } from "react";

import CardWithText from "../card/CardWithText";
import { dateFilter } from "@/utils/constants";
import axios from "axios";
import { upcomingEvents } from "@/utils/config";
import toast from "react-hot-toast";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const UpcomingEvents = () => {
  const [allUpcomingEvents, setAllUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterEvents = async (value) => {
    let TodayStartDateTimeStr, TodayEndDatetimeStr;
    switch (value) {
      case "All":
        // console.log("all");
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
    toast.dismiss();
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
          toast.error(data.message);
          // setAllUpcomingEvents([]);
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

      setAllUpcomingEvents(response.data.data);
      setLoading(false);
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
          setAllUpcomingEvents([]);
        }
      }
    }
  };

  const cardsData = allUpcomingEvents.slice(0, 8);

  if (loading) return;

  if (allUpcomingEvents.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="mt-6 md:mt-12 px-8 md:px-6 overflow-hidden ">
      <div className="flex md:mt-0  md:flex-row flex-col justify-between ">
        <h1 className=" capitalize text-lg md:text-xl lg:text-3xl font-bold">
          Upcoming Events:
        </h1>
        <div className="flex lg:gap-12 gap-6 md:mt-0 mt-4 lg:text-lg  md:text-sm text-sm font-bold ">
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

      <div className="">
        <Swiper
          spaceBetween={6}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            425: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 20,
            },
          }}
        >
          {cardsData?.map((data) => (
            <SwiperSlide key={data.id}>
              <div key={data.id} className=" md:mt-6 mt-4   ">
                <Link href={`/events/${data.event_id}`}>
                  <CardWithText data={data} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default UpcomingEvents;
