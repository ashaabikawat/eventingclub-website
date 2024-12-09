"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Languages from "./Languages";
import Categories from "./Categories";
import Genre from "./Genre";
import { dropdownOptions, formatDateForInput } from "@/utils/constants";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import DatePicker from "./DatePicker";

const Filter = ({
  handleLanguageSelection,
  handleDateSelection,
  handleCategory,
  handleCancel,
  handleGenre,
  isManual,
  setIsManual,
  fetchEvents,
  filterOpenModal,
  setFilterOpenModal,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleManualSubmit,
  setRange,
  range,
  setFilters,
}) => {
  const [open, setOpen] = useState(1);
  const [active, setActive] = useState("Date");
  const startPickerRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState();
  const [visiblePicker, setVisiblePicker] = useState(null);

  const [today, setToday] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
      // setToday(today);
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (today) {
      const date = formatDateForInput(today.toLocaleDateString("en-US"));
      setFormattedDate(date);
    }
  }, [today]);

  const handleDateRange = (range) => {
    setRange(range);
    if (range === "start") {
      setVisiblePicker("start");
    } else if (range === "end") {
      setVisiblePicker("end");
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 650;
      setIsMobile(isMobileView);

      // Automatically open the filter modal on mobile and close it on larger screens
      if (isMobileView) {
        setFilterOpenModal(true); // Show modal on mobile
      } else {
        setFilterOpenModal(false); // Hide modal on larger screens
      }
    };

    // Initial check on component mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleManualDateChange = (e, type) => {
    if (type === "start") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  useEffect(() => {
    let flatpickrInstance;

    if (isManual && startPickerRef.current) {
      // Initialize Flatpickr when isManual is true
      flatpickrInstance = Flatpickr(startPickerRef.current, {
        inline: true, // Enable inline mode
        defaultDate: formattedDate, // Default date, you can change this to dynamic value
        onChange: (selectedDates) => {
          setSelectedDates(selectedDates[0]);
          if (range === "start") {
            setStartDate(selectedDates[0]);
          } else {
            setEndDate(selectedDates[0]);
          }
        },
      });
    }

    // Cleanup function to destroy the Flatpickr instance when the checkbox is unchecked
    return () => {
      if (flatpickrInstance) {
        flatpickrInstance.destroy(); // Destroy the Flatpickr instance
      }
    };
  }, [isManual, range]);

  const handleClear = () => {
    fetchEvents();
    setFilterOpenModal(false);
    setFilters({});
  };

  const data = [
    {
      name: "Date",
      component: (
        <DatePicker
          handleDateSelection={handleDateSelection}
          isManual={isManual}
          setIsManual={setIsManual}
          range={range}
          setRange={setRange}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          handleManualSubmit={handleManualSubmit}
          handleClear={handleClear}
          setFilterOpenModal={setFilterOpenModal}
        />
      ),
    },
    {
      name: "Language",
      component: (
        <Languages handleLanguageSelection={handleLanguageSelection} />
      ),
    },
    {
      name: "Category",
      component: <Categories handleCategory={handleCategory} />,
    },
    {
      name: "Genre",
      component: <Genre handleGenre={handleGenre} />,
    },
  ];

  return (
    <div className="">
      <div className="md:w-80 w-full font-nunito  hidden md:block md:mt-4 mb-20">
        <h1 className="md:text-xl mb-4 font-semibold font-poppins ">
          Filters:
        </h1>
        <div className="border border-gray-400 rounded-md p-4 ">
          <Accordion
            open={open === 1}
            className="relative border border-gray-400 px-4 rounded-md mb-4 "
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className=" p-2 flex items-center justify-between border-none text-base font-nunito "
            >
              <div className="flex items-center gap-2">
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
                <span>Date</span>
              </div>
              <span
                className="text-sm text-blue-900 absolute right-4"
                onClick={() => {
                  setFilters({});
                  fetchEvents();
                  setIsManual(false);
                }}
              >
                Clear
              </span>
            </AccordionHeader>
            <AccordionBody className=" font-nunito">
              {/* Date filters go here */}
              {/* <DateFilter /> */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dropdownOptions.map((option) => (
                  <div
                    key={option.id}
                    className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer"
                    onClick={() => handleDateSelection(option.Value)}
                  >
                    {option.Value}
                  </div>
                ))}
              </div>

              <div className="relative">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={isManual}
                    onChange={() => setIsManual(!isManual)}
                  />
                  <span className="ml-2 text-black cursor-pointer">
                    Date Range
                  </span>
                </label>
              </div>
            </AccordionBody>
            <div
              className={`mb-6 bg-white absolute z-50  border border-white rounded-lg font-nunito ${
                isManual ? "" : "hidden"
              }`}
            >
              {isManual && (
                <div className="relative shadow-xl p-4">
                  <div className="flex gap-8 mb-6 items-center justify-around">
                    <span
                      onClick={() => handleDateRange("start")}
                      className={`relative text-xl cursor-pointer text-center ${
                        range === "start" ? "text-blue-900" : ""
                      }`}
                    >
                      Start
                      <span
                        className={`absolute left-0 right-0 mx-auto block h-[2px] bg-blue-900 mt-1 transition-transform duration-300 transform ${
                          range === "start" ? "scale-x-150 " : "scale-x-0"
                        }`}
                      />
                    </span>

                    <span
                      onClick={() => handleDateRange("end")}
                      className={`relative text-xl cursor-pointer text-center ${
                        range === "end" ? "text-blue-900" : ""
                      }`}
                    >
                      End
                      <span
                        className={`absolute left-0 right-0 mx-auto block h-[2px] bg-blue-900 mt-1 transition-transform duration-300 transform ${
                          range === "end" ? "scale-x-150" : "scale-x-0"
                        }`}
                      />
                    </span>
                  </div>

                  <div
                    id="datepicker-start"
                    ref={startPickerRef}
                    className="absolute top-full left-0  shadow-none border-none outline-none focus:border-none focus:ring-  "
                  ></div>
                  <div className="flex gap-6 mt-6 justify-around items-center">
                    <button
                      className="text-base border border-gray-400  px-4 py-2 rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleManualSubmit}
                      className="text-white bg-blue-900  px-4 py-2 rounded"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Accordion>

          <Accordion
            open={open === 2}
            className="relative border border-gray-400 px-4 rounded-md mb-4"
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className=" p-2 flex items-center justify-between border-none text-base font-nunito "
            >
              <div className="flex items-center gap-2">
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
                <span>Languages</span>
              </div>
              <span
                className="text-sm text-blue-900 absolute right-4"
                onClick={() => {
                  setFilters({});
                  fetchEvents();
                }}
              >
                Clear
              </span>
            </AccordionHeader>
            <AccordionBody className=" ">
              <Languages handleLanguageSelection={handleLanguageSelection} />
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 3}
            className="relative border border-gray-400 px-4 rounded-md mb-4"
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className=" p-2 flex items-center justify-between border-none text-base font-nunito "
            >
              <div className="flex items-center gap-2">
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform ${
                    open === 3 ? "rotate-180" : ""
                  }`}
                />
                <span>Categories</span>
              </div>
              <span
                className="text-sm text-blue-900 absolute right-4"
                onClick={() => {
                  setFilters({});
                  fetchEvents();
                }}
              >
                Clear
              </span>
            </AccordionHeader>
            <AccordionBody className=" ">
              <Categories handleCategory={handleCategory} />
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 4}
            className="relative border border-gray-400 px-4 rounded-md mb-4"
          >
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className=" p-2 flex items-center justify-between border-none text-base font-nunito"
            >
              <div className="flex items-center gap-2">
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
                <span>Genre</span>
              </div>
              <span
                className="text-sm text-blue-900 absolute right-4"
                onClick={() => {
                  setFilters({});
                  fetchEvents();
                }}
              >
                Clear
              </span>
            </AccordionHeader>
            <AccordionBody className=" ">
              {/* Date filters go here */}
              <Genre handleGenre={handleGenre} />
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      <div className="">
        {" "}
        {/* Ensures it takes full screen height */}
        {filterOpenModal && (
          <div className="w-full py-4 fixed inset-0 z-40 px-4 bg-white overflow-y-auto ">
            <div className="mb-4 mt-24">
              <div className="w-full border-b-2 border-gray-300 pb-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">Filters</p>
                  <p className="cursor-pointer  " onClick={handleClear}>
                    Clear all
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 w-full h-full bg-gray-300">
              {" "}
              {/* Ensure minimum height */}
              {/* Sidebar */}
              <div className="w-full max-h-screen border border-gray-300 bg-gray-300 mt-6 flex flex-col justify-between">
                <div>
                  <ul className="flex flex-col gap-2">
                    {data.map((data) => (
                      <li
                        key={data.name}
                        className="capitalize p-2"
                        onClick={() => setActive(data.name)}
                      >
                        {data.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-black bg-white text-center w-full p-2 cursor-pointer"
                    onClick={() => setFilterOpenModal(false)} // Close modal
                  >
                    Close
                  </button>
                </div>
              </div>
              {/* Content Area */}
              <div className="bg-white w-full flex flex-col justify-between">
                {" "}
                {/* flex-grow for flexible height */}
                <div className="flex flex-col justify-between w-full h-full">
                  <div className="p-6 text-sm">
                    {data.map(
                      (data) =>
                        active === data.name && (
                          <div key={data.name}>{data.component}</div>
                        )
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => setFilterOpenModal(false)}
                      type="submit"
                      className="text-white bg-blue-900 text-center w-full p-2 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
