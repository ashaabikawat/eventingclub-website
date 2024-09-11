"use client";
import CardWithText from "@/components/card/CardWithText";
import PageCardWithText from "@/components/card/PageCardWithText";
import Filter from "@/components/filter/Filter";
import NotFound from "@/components/not found/NotFound";
import { featuredEvents, onlineEvents } from "@/utils/config";

import { dateFilter, URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbFilter } from "react-icons/tb";

const Page = () => {
  const [allFeaturedEvents, setAllFeaturedEvents] = useState([]);
  const [duplicateFeaturedEvents, setDuplicateFeaturedEvents] = useState([]);
  const [isManual, setIsManual] = useState(false);
  const [filterOpenModal, setFilterOpenModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    setError(false);
    try {
      const response = await axios.post(featuredEvents.GET_ALL);
      // console.log(response.data.data);
      setAllFeaturedEvents(response.data.data);
      // duplicateFeaturedEvents(response.data.data);
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
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleLanguageSelection = async (value) => {
    // console.log(value);
    const payload = {
      LanguageName: value,
    };
    try {
      const response = await axios.post(`${featuredEvents.GET_ALL}`, payload);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllFeaturedEvents(response.data.data);
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
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleGenre = async (value) => {
    // console.log(value);
    const payload = {
      Genre_id: value,
    };
    // console.log(payload);
    try {
      const response = await axios.post(`${featuredEvents.GET_ALL}`, payload);
      // console.log(response.data);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllFeaturedEvents(response.data.data);
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
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleCategory = async (value) => {
    // console.log(value);
    const payload = {
      category_id: value,
    };
    try {
      const response = await axios.post(`${featuredEvents.GET_ALL}`, payload);
      // console.log(response.data);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllFeaturedEvents(response.data.data);
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
          setError(true);
          toast.error(data.message);
        }
      }
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
        case "Tomorrow":
          ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
            dateFilter("Tomorrow"));
          break;
        case "This weekend":
          ({ TodayStartDateTimeStr, TodayEndDatetimeStr } =
            dateFilter("This weekend"));
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
    console.log(startDate, endDate);
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

      const response = await axios.post(`${featuredEvents.GET_ALL}`, payload);
      // console.log(response.data.data.length);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllFeaturedEvents(response.data.data);
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
          setError(true);
        }
      }
    }
  };
  return (
    <>
      <Toaster />
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
              fetchEvents={fetchFeaturedEvents}
            />
          </div>
          <div className=" w-full md:h-80  md:block">
            {error ? (
              <NotFound />
            ) : (
              <div className="grid lg:grid-cols-3 mt-4 grid-cols-2 lg:gap-4 md:gap-6 gap-6">
                {allFeaturedEvents?.map((event) => {
                  return (
                    <div>
                      <PageCardWithText event={event} />{" "}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;