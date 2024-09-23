"use client";

import Filter from "@/components/filter/Filter";
import { categories, upcomingEvents } from "@/utils/config";
import { dateFilter, URL } from "@/utils/constants";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbFilter } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import PageCardWithText from "@/components/card/PageCardWithText";
import NotFound from "@/components/not found/NotFound";

const Page = () => {
  const [allUpcomingEvents, setAllUpcomingEvents] = useState([]);
  const [isManual, setIsManual] = useState(false);
  const { id } = useParams();
  const [filterOpenModal, setFilterOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    fetchUpcomingEvents();
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUpcomingEvents = async () => {
    setError(false);
    try {
      const response = await axios.post(upcomingEvents.GET_ALL);
      // console.log(response.data.data);
      setAllUpcomingEvents(response.data.data);
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
      const response = await axios.post(`${upcomingEvents.GET_ALL}`, payload);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllUpcomingEvents(response.data.data);
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
      const response = await axios.post(`${upcomingEvents.GET_ALL}`, payload);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllUpcomingEvents(response.data.data);
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
      const response = await axios.post(`${upcomingEvents.GET_ALL}`, payload);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllUpcomingEvents(response.data.data);
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

      const response = await axios.post(`${upcomingEvents.GET_ALL}`, payload);
      // console.log(response.data.data.length);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllUpcomingEvents(response.data.data);

      // toast.success(response.data.message);
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

  return (
    <div className="mt-2 ">
      {isMobile && !filterOpenModal && (
        <h1 className="md:text-3xl mb-4 px-4 font-semibold text-lg ">
          Upcoming Events:
        </h1>
      )}
      {!filterOpenModal && isMobile && (
        <div className="grid grid-cols-2 md:hidden mb-2 items-center justify-center">
          <div
            className="text-center flex items-center justify-center gap-2 py-2 border border-gray-300"
            onClick={() => setFilterOpenModal(true)}
          >
            <button>
              <TbFilter size={18} color="gray" />
            </button>
            <span className="text-center">Filter</span>
          </div>
          <div className="text-center flex items-center justify-center gap-2 py-2 border border-gray-300">
            <button>
              <FaMapMarkerAlt size={18} color="gray" />
            </button>
            <span className="text-center">Venues</span>
          </div>
        </div>
      )}

      <div className=" w-full md:px-6 px-4">
        <div className="w-full  grid gap-6  md:grid-cols-[300px_minmax(300px,_1fr)_1fr]">
          {!isMobile && (
            <div className="hidden md:block">
              <Filter
                handleDateSelection={handleDateSelection}
                handleLanguageSelection={handleLanguageSelection}
                handleCategory={handleCategory}
                handleGenre={handleGenre}
                isManual={isManual}
                setIsManual={setIsManual}
                fetchEvents={fetchUpcomingEvents}
                setFilterOpenModal={setFilterOpenModal}
                filterOpenModal={filterOpenModal}
              />
            </div>
          )}

          <div className="w-full   md:block md:col-span-2">
            {error ? (
              <NotFound />
            ) : (
              <>
                {!filterOpenModal && (
                  <>
                    <h1 className="md:text-xl hidden md:block  mt-4 px-4 font-semibold text-lg ">
                      Upcoming Events:
                    </h1>
                    <div className="grid col-span-2 lg:grid-cols-3 mt-6 md:px-4 grid-cols-2 lg:gap-4 md:gap-6 gap-4">
                      {allUpcomingEvents?.map((event) => (
                        <PageCardWithText key={event.id} event={event} />
                      ))}
                    </div>
                  </>
                )}
                {filterOpenModal && (
                  <Filter
                    handleDateSelection={handleDateSelection}
                    handleLanguageSelection={handleLanguageSelection}
                    handleCategory={handleCategory}
                    handleGenre={handleGenre}
                    isManual={isManual}
                    setIsManual={setIsManual}
                    fetchEvents={fetchUpcomingEvents}
                    setFilterOpenModal={setFilterOpenModal}
                    filterOpenModal={filterOpenModal}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
