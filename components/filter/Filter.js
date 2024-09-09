"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import DateFilter from "./DateFilter";
import Languages from "./Languages";
import Categories from "./Categories";
import Genre from "./Genre";

const Filter = () => {
  const data = [
    {
      name: "date",
      content: <DateFilter />,
    },
    {
      name: "Languages",
      content: <Languages />,
    },
    {
      name: "categories",
      content: <Categories />,
    },
    {
      name: "Genre",
      content: <Genre />,
    },
  ];

  const [open, setOpen] = useState(1);
  const [active, setActive] = useState("date");
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:w-72 w-full h-full md:px-6 ">
      {isMobile ? (
        <>
          <div className="px-4 mb-4">
            <div className=" w-full h-full border-b-2 border-gray-300 pb-4 ">
              <div className="flex justify-between">
                <p>Filters</p>
                {/* <p>Clear all</p> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full h-full  bg-gray-300">
            <div className=" w-full  border border-gray-300 mt-6 flex flex-col justify-between  ">
              <div>
                <ul className="flex flex-col gap-2 ">
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
                >
                  Close
                </button>
              </div>
            </div>
            <div className="bg-white w-full h-full">
              <div className="flex flex-col justify-between w-full h-full">
                <div className="p-6 text-sm">
                  {data.map(
                    (data) =>
                      active === data.name && (
                        <div key={data.name}>{data.content}</div>
                      )
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-white bg-blue-900 text-center w-full p-2 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="md:text-2xl mb-4">Filters:</h1>
          <div className="border border-gray-400 rounded-md p-4">
            <Accordion
              open={open === 1}
              className="relative border border-gray-400 px-4 rounded-md mb-4"
            >
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className=" p-2 flex items-center justify-between border-none text-base "
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
                    // Add clear filter logic here
                  }}
                >
                  Clear
                </span>
              </AccordionHeader>
              <AccordionBody className=" ">
                {/* Date filters go here */}
                <DateFilter />
                <div>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2 text-black cursor-pointer ">
                      Date Range
                    </span>
                  </label>
                </div>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 2}
              className="relative border border-gray-400 px-4 rounded-md mb-4"
            >
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className=" p-2 flex items-center justify-between border-none text-base "
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
                    // Add clear filter logic here
                  }}
                >
                  Clear
                </span>
              </AccordionHeader>
              <AccordionBody className=" ">
                <Languages />
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 3}
              className="relative border border-gray-400 px-4 rounded-md mb-4"
            >
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className=" p-2 flex items-center justify-between border-none text-base "
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
                    // Add clear filter logic here
                  }}
                >
                  Clear
                </span>
              </AccordionHeader>
              <AccordionBody className=" ">
                <Categories />
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 4}
              className="relative border border-gray-400 px-4 rounded-md mb-4"
            >
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className=" p-2 flex items-center justify-between border-none text-base "
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
                    // Add clear filter logic here
                  }}
                >
                  Clear
                </span>
              </AccordionHeader>
              <AccordionBody className=" ">
                {/* Date filters go here */}
                <Genre />
              </AccordionBody>
            </Accordion>
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
