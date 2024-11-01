"use client";
import PageCardWithText from "@/components/card/PageCardWithText";
import Filter from "@/components/filter/Filter";
import NotFound from "@/components/not found/NotFound";
import { onlineEvents } from "@/utils/config";

import { dateFilter } from "@/utils/constants";

import axios from "axios";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbFilter } from "react-icons/tb";

const Page = () => {
  const [allOnlineEvents, setAllOnlineEvents] = useState([]);
  const [duplicateOnlineEvents, setDuplicateOnlineEvents] = useState([]);

  const [isManual, setIsManual] = useState(false);

  const [filterOpenModal, setFilterOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [range, setRange] = useState("start");
  const [filters, setFilters] = useState({});

  const handleCancel = () => {
    setIsManual(false);
    setEndDate(null);
    setStartDate(null);
    setRange("start");
  };

  const handleManualSubmit = () => {
    DateFilterApiCall(startDate, endDate);
    setIsManual(false);
    setFilterOpenModal(false);
  };
  useEffect(() => {
    fetchOnlineEvents();
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchOnlineEvents = async () => {
    setError(false);
    try {
      const response = await axios.post(onlineEvents.GET_ALL);

      setAllOnlineEvents(response.data.data);
      setDuplicateOnlineEvents(response.data.data);
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
        }
      }
    }
  };

  const handleLanguageSelection = async (value) => {
    let newFilters = { ...filters };
    newFilters.LanguageName = value;

    setFilters(newFilters);
    const payload = {
      ...newFilters,
    };
    setError(false);
    try {
      const response = await axios.post(`${onlineEvents.GET_ALL}`, payload);
      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllOnlineEvents(response.data.data);
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
          setError(true);
          toast.error(data.message);
          setFilters({});
        }
      }
    }
  };

  const handleGenre = async (value) => {
    let newFilters = { ...filters };
    newFilters.Genre_id = value;
    setFilters(newFilters);

    const payload = {
      ...newFilters,
    };

    try {
      const response = await axios.post(`${onlineEvents.GET_ALL}`, payload);

      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllOnlineEvents(response.data.data);
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
          setError(true);
          setFilters({});
        }
      }
    }
  };

  const handleCategory = async (value) => {
    let newFilters = { ...filters };
    newFilters.category_id = value;
    setFilters(newFilters);
    const payload = {
      ...newFilters,
    };
    try {
      const response = await axios.post(`${onlineEvents.GET_ALL}`, payload);

      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllOnlineEvents(response.data.data);
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
          setError(true);
          toast.error(data.message);
          setFilters({});
        }
      }
    }
  };

  const handleDateSelection = (option) => {
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
    }
  };

  const DateFilterApiCall = async (startDate, endDate) => {
    if (
      startDate === "Invalid date+00:00" ||
      endDate === "Invalid date+00:00"
    ) {
      toast.error("Please select date range");
      return;
    }
    if (startDate === null) {
      toast.error("Please select start date range");
      return;
    }
    if (endDate === null) {
      toast.error("Please select end date range");
      return;
    }

    if (startDate === null || endDate === null) {
      toast.error("Please select date range");
      return;
    }

    let newFilters = { ...filters };
    newFilters.startDate = startDate;
    newFilters.endDate = endDate;

    setFilters(newFilters);
    setError(false);

    try {
      const payload = {
        ...newFilters,
      };

      const response = await axios.post(`${onlineEvents.GET_ALL}`, payload);

      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllOnlineEvents(response.data.data);
      setEndDate(null);
      setStartDate(null);
      setRange("start");
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
          setError(true);
          setFilterOpenModal(false);
          setFilters({});
        }
      }
    }
  };
  return (
    <div className=" md:py-6 md:mb-16  mb-16">
      {isMobile && !filterOpenModal && (
        <h1 className="md:text-3xl mb-4 px-4 font-semibold text-lg ">
          Online Events:
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
            <Link href={`/venue`}>
              <span className="text-center">Venues</span>
            </Link>
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
                fetchEvents={fetchOnlineEvents}
                setFilterOpenModal={setFilterOpenModal}
                filterOpenModal={filterOpenModal}
                setFilters={setFilters}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                handleCancel={handleCancel}
              />
            </div>
          )}

          <div className="w-full   md:block md:col-span-2">
            <>
              {!filterOpenModal && (
                <>
                  <h1 className="md:text-xl hidden md:block  mt-4 px-4 font-semibold text-lg ">
                    Online Events:
                  </h1>
                  <div className="grid col-span-2 lg:grid-cols-3 mt-6 md:px-4 grid-cols-2 lg:gap-4 md:gap-6 gap-4">
                    {error ? (
                      <div className="md:mt-10 md:mb-10 col-span-2 lg:col-span-3">
                        <NotFound />
                      </div>
                    ) : (
                      allOnlineEvents?.map((event) => (
                        <PageCardWithText key={event.id} event={event} />
                      ))
                    )}
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
                  fetchEvents={fetchOnlineEvents}
                  setFilterOpenModal={setFilterOpenModal}
                  filterOpenModal={filterOpenModal}
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  handleManualSubmit={handleManualSubmit}
                  range={range}
                  setRange={setRange}
                  setFilters={setFilters}
                  handleCancel={handleCancel}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
