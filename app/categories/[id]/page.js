"use client";

import Filter from "@/components/filter/Filter";
import { categories } from "@/utils/config";
import { dateFilter } from "@/utils/constants";
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
  const [events, setEvents] = useState([]);
  const [isManual, setIsManual] = useState(false);
  const { id } = useParams();
  const [filterOpenModal, setFilterOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    fetchEvents();
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchEvents = async () => {
    const payload = { category_id: id };
    setError(false);
    try {
      const response = await axios.post(categories.GET_BY_ID, payload);
      setEvents(response.data.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if ([400, 401, 403, 404, 409, 500].includes(status)) {
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleLanguageSelection = async (value) => {
    const payload = { category_id: id, LanguageName: value };
    try {
      const response = await axios.post(categories.GET_BY_ID, payload);
      setEvents(response.data.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if ([400, 401, 403, 404, 409, 500].includes(status)) {
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleGenre = async (value) => {
    const payload = { category_id: id, Genre_id: value };
    try {
      const response = await axios.post(categories.GET_BY_ID, payload);
      setEvents(response.data.data);
      setFilterOpenModal(false);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if ([400, 401, 403, 404, 409, 500].includes(status)) {
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleCategory = async (value) => {
    const payload = { category_id: value };
    try {
      const response = await axios.post(categories.GET_BY_ID, payload);
      setEvents(response.data.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if ([400, 401, 403, 404, 409, 500].includes(status)) {
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  const handleDateSelection = (option) => {
    if (option !== "Manual" && option !== "Reset") {
      const { TodayStartDateTimeStr, TodayEndDatetimeStr } =
        dateFilter(option) || {};
      if (TodayStartDateTimeStr && TodayEndDatetimeStr) {
        DateFilterApiCall(TodayStartDateTimeStr, TodayEndDatetimeStr);
      }
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
    try {
      const payload = { category_id: id, startDate, endDate };
      const response = await axios.post(categories.GET_BY_ID, payload);
      setEvents(response.data.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if ([400, 401, 403, 404, 409, 500].includes(status)) {
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };

  return (
    <div className="mt-6  ">
      <Toaster />
      {/* <h1 className="text-2xl mb-6 md:px-12  px-4 hidden mt-4">Events:</h1> */}
      {!filterOpenModal && isMobile && (
        <div className="grid grid-cols-2 md:hidden mb-6 items-center justify-center">
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
      <div className="h-full w-full md:px-12 px-4 mt-6">
        <div className="w-full h-full grid gap-6 md:grid-cols-[300px_minmax(400px,_1fr)]">
          {!isMobile && (
            <div className="w-2/3 h-full hidden md:block">
              <Filter
                handleDateSelection={handleDateSelection}
                handleLanguageSelection={handleLanguageSelection}
                handleCategory={handleCategory}
                handleGenre={handleGenre}
                isManual={isManual}
                setIsManual={setIsManual}
                fetchEvents={fetchEvents}
                setFilterOpenModal={setFilterOpenModal}
                filterOpenModal={filterOpenModal}
              />
            </div>
          )}
          <div className="w-full md:h-80 md:block">
            {!filterOpenModal && (
              <h1 className="md:text-3xl">Category Events:</h1>
            )}
            {error ? (
              <NotFound />
            ) : (
              <>
                {!filterOpenModal && (
                  <div className="grid lg:grid-cols-3 mt-8 grid-cols-2 lg:gap-4 md:gap-6 gap-6">
                    {events?.map((event) => (
                      <PageCardWithText key={event.id} event={event} />
                    ))}
                  </div>
                )}
                {filterOpenModal && (
                  <Filter
                    handleDateSelection={handleDateSelection}
                    handleLanguageSelection={handleLanguageSelection}
                    handleCategory={handleCategory}
                    handleGenre={handleGenre}
                    isManual={isManual}
                    setIsManual={setIsManual}
                    fetchEvents={fetchEvents}
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
