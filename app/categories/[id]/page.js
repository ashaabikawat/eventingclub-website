"use client";

import Filter from "@/components/filter/Filter";
import { categories } from "@/utils/config";
import { dateFilter, URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbFilter } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const page = () => {
  const [events, setEvents] = useState([]);
  const [isManual, setIsManual] = useState(false);
  const { id } = useParams();
  const [filterOpenModal, setFilterOpenModal] = useState(false);

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

  const handleLanguageSelection = async (value) => {
    // console.log(value);
    const payload = {
      category_id: id,
      LanguageName: value,
    };
    try {
      const response = await axios.post(`${categories.GET_BY_ID}`, payload);
      console.log(response.data);
      setEvents(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGenre = async (value) => {
    // console.log(value);
    const payload = {
      category_id: id,
      Genre_id: value,
    };
    // console.log(payload);
    try {
      const response = await axios.post(`${categories.GET_BY_ID}`, payload);
      console.log(response.data);
      setEvents(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCategory = async (value) => {
    // console.log(value);
    const payload = {
      category_id: value,
    };
    try {
      const response = await axios.post(`${categories.GET_BY_ID}`, payload);
      console.log(response.data);
      setEvents(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDateSelection = (option) => {
    // setIsManual(option === "Manual");
    // setIsOpen(false);
    // console.log({ option });
    // if (option === "Reset") {
    //   handleReset();
    // }
    // console.log(value);
    if (option !== "Manual" && option !== "Reset") {
      const currentDate = new Date();
      let TodayStartDateTimeStr, TodayEndDatetimeStr;
      switch (option) {
        case "Today":
          ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
            dateFilter("Today"));
          break;
        case "Yesterday":
          ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
            dateFilter("Yesterday"));
          break;
        case "Last 7 Days":
          ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
            dateFilter("Last 7 Days"));
          break;
        case "Last 1 Month":
          ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
            dateFilter("Last 1 Month"));
          break;
        default:
          TodayStartDateTimeStr = null;
          TodayEndDatetimeStr = null;
      }
      DateFilterApiCall(TodayStartDateTimeStr, TodayEndDatetimeStr);
      // console.log(TodayStartDateTimeStr, TodayEndDatetimeStr);
    }
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
        category_id: id,
        startDate: startDate,
        endDate: endDate,
      };

      // console.log({ payload });

      const response = await axios.post(`${categories.GET_BY_ID}`, payload);
      console.log(response.data.data);
      setEvents(response.data.data);
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
          console.log(error.response);
          toast.error(data.message);
          setEvents([]);
        }
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-6 md:px-12 block px-8 md:hidden mt-4">
        Events:
      </h1>
      <div className="grid grid-cols-2 md:hidden mb-6 items-center justify-center ">
        <div className="text-center flex items-center justify-center gap-2 py-2  border border-gray-300  ">
          <button className="">
            <TbFilter size={18} color="gray" />
          </button>
          <span className="text-center">Filter</span>
        </div>
        <div className="text-center flex items-center justify-center gap-2  py-2   border border-gray-300">
          <button>
            <FaMapMarkerAlt size={18} color="gray" />
          </button>
          <span className="text-center">Venues</span>
        </div>
      </div>
      <div className="h-full w-full md:px-12 px-6 mt-4">
        <div className="w-full h-full grid gap-6 md:grid-cols-[300px_minmax(400px,_1fr)] ">
          <div className=" w-2/3 h-full hidden md:block">
            <Filter
              setFilterOpenModal={setFilterOpenModal}
              handleDateSelection={handleDateSelection}
              handleLanguageSelection={handleLanguageSelection}
              handleCategory={handleCategory}
              handleGenre={handleGenre}
              isManual={isManual}
              setIsManual={setIsManual}
            />
          </div>
          <div className=" w-full md:h-80  md:block">
            <div className="grid lg:grid-cols-3 mt-4 grid-cols-2 lg:gap-4 md:gap-6 gap-6">
              {events?.map((event) => {
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
                        <p className="capitalize text-xs md:text-base">
                          {event.EventName}
                        </p>
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
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
