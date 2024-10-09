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
import { Swiper, SwiperSlide } from "swiper/react";

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

  if (loading) return;

  if (allUpcomingEvents.length === 0 && !loading) {
    return null;
  }

  return (
    // <div className="   sm:px-8 px-1 overflow-hidden md:px-10">
    //   <Toaster />

    //   <div className="px-2">
    //     <Swiper
    //       spaceBetween={6}
    //       slidesPerView={5}
    //       breakpoints={{
    //         320: {
    //           slidesPerView: 1.5,
    //           spaceBetween: 16,
    //         },
    //         425: {
    //           slidesPerView: 2.5,
    //           spaceBetween: 10,
    //         },
    //         768: {
    //           slidesPerView: 3.5,
    //           // spaceBetween: 20,
    //         },
    //         1024: {
    //           slidesPerView: 4.5,
    //           spaceBetween: 4,
    //         },
    //       }}
    //       // onSlideChange={() => console.log("slide change")}
    //       // onSwiper={(swiper) => console.log(swiper)}
    //       // className="mt-3 "
    //     >
    //       {cardsData.map((data) => (
    //         <SwiperSlide key={data.id}>
    //           <div
    //             key={data.id}
    //             className=" md:px-2 mt-6 md:h-[330px] lg:h-[400px]"
    //           >
    //             <Link href={`/events/${data.event_id}`}>
    //               <CardWithText data={data} />
    //             </Link>
    //           </div>
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   </div>
    // </div>
    <div className=" mb-2  mt-10 md:mb-6  sm:px-4 px-1 overflow-hidden md:px-4">
      <div className="flex md:mt-0  md:flex-row flex-col justify-between px-4">
        <h1 className="capitalize text-base md:text-2xl font-bold">
          Upcoming Events
        </h1>
        <div className="flex lg:gap-12 gap-6 md:mt-0 mt-4 lg:text-lg  md:text-sm text-xs font-bold ">
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

      <div className="px-3">
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
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          // className="mt-3"
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
