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
import Link from "next/link";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [range, setRange] = useState("start");
  const [filters, setFilters] = useState({});

  const handleManualSubmit = () => {
    DateFilterApiCall(startDate, endDate);
    setIsManual(false);
    setFilterOpenModal(false);
  };

  useEffect(() => {
    fetchFeaturedEvents();
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchFeaturedEvents = async () => {
    toast.dismiss();
    setError(false);
    try {
      const response = await axios.post(featuredEvents.GET_ALL);

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
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleLanguageSelection = async (value) => {
    toast.dismiss();
    let newFilters = { ...filters };
    newFilters.LanguageName = value;

    setFilters(newFilters);

    const payload = {
      ...newFilters,
    };
    setError(false);
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
          setError(true);
          toast.error(data.message);
          setFilters({});
        }
      }
    }
  };

  const handleGenre = async (value) => {
    toast.dismiss();
    let newFilters = { ...filters };
    newFilters.Genre_id = value;
    setFilters(newFilters);

    const payload = {
      ...newFilters,
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
          setError(true);
          toast.error(data.message);
          setFilters({});
        }
      }
    }
  };

  const handleCategory = async (value) => {
    toast.dismiss();
    let newFilters = { ...filters };
    newFilters.category_id = value;
    setFilters(newFilters);
    const payload = {
      ...newFilters,
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
          setError(true);
          toast.error(data.message);
          setFilters({});
        }
      }
    }
  };

  const handleDateSelection = (option) => {
    toast.dismiss();
    if (option !== "Manual" && option !== "Reset") {
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

  const handleCancel = () => {
    setIsManual(false);
    setEndDate(null);
    setStartDate(null);
    setRange("start");
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

      const response = await axios.post(`${featuredEvents.GET_ALL}`, payload);

      if (response.data.data.length >= 1) {
        setError(false);
      }
      setAllFeaturedEvents(response.data.data);
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
    <div className="md:py-6 mb-12 px-4 md:px-8 pt-10">
      {isMobile && !filterOpenModal && (
        <h1 className="md:text-3xl mb-4  font-semibold text-lg bebas-neue ">
          Featured Events:
        </h1>
      )}
      {!filterOpenModal && isMobile && (
        <div className="grid grid-cols-2 md:hidden mb-2 items-center justify-center  ">
          <div
            className="text-center flex items-center justify-center gap-1 py-2 border border-gray-300"
            onClick={() => setFilterOpenModal(true)}
          >
            <button>
              <TbFilter size={18} color="gray" />
            </button>
            <span className="text-center font-semibold">Filter</span>
          </div>
          <div className="text-center flex items-center justify-center gap-1 py-2 border border-gray-300">
            <button>
              <FaMapMarkerAlt size={18} color="gray" />
            </button>
            <Link href={`/venue`}>
              <span className="text-center font-semibold">Venues</span>
            </Link>
          </div>
        </div>
      )}

      <div className=" w-full">
        <div className="w-full  grid gap-10  md:grid-cols-[300px_minmax(300px,_1fr)_1fr]">
          {!isMobile && (
            <div className="hidden md:block">
              <Filter
                handleDateSelection={handleDateSelection}
                handleLanguageSelection={handleLanguageSelection}
                handleCategory={handleCategory}
                handleGenre={handleGenre}
                isManual={isManual}
                setIsManual={setIsManual}
                fetchEvents={fetchFeaturedEvents}
                setFilterOpenModal={setFilterOpenModal}
                filterOpenModal={filterOpenModal}
                setFilters={setFilters}
                fetchFeaturedEvents={fetchFeaturedEvents}
                startDate={startDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                handleManualSubmit={handleManualSubmit}
                range={range}
                setRange={setRange}
                handleCancel={handleCancel}
              />
            </div>
          )}

          <div className="w-full   md:block md:col-span-2">
            <>
              {!filterOpenModal && (
                <>
                  <h1 className="md:text-xl hidden md:block  mt-4 font-semibold text-lg bebas-neue ">
                    Featured Events:
                  </h1>
                  <div className="grid col-span-2 lg:grid-cols-3 mt-6  grid-cols-2 lg:gap-y-12 md:gap-6 gap-4 gap-y-10">
                    {error ? (
                      <div className="md:mt-10 md:mb-10 col-span-2 lg:col-span-3">
                        <NotFound />
                      </div>
                    ) : (
                      allFeaturedEvents
                        ?.filter(
                          (items) => items?.EventCardImages[0]?.image_path
                        )
                        ?.map((event) => (
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
                  fetchEvents={fetchFeaturedEvents}
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
