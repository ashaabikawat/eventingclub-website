import React, { useEffect, useRef, useState } from "react";
import { testimonials } from "@/utils/constants";
import Image from "next/image";
import { Carousel, IconButton } from "@material-tailwind/react";

const Testimonials = () => {
  return (
    <div className="h-full w-full overflow-hidden md:py-12 py-6  md:px-20 px-6 font-nunito">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <p className="capitalize md:text-3xl text-2xl font-bold text-gray-800 tracking-wide font-poppins">
          Testimonials
        </p>
        <div className="w-20 h-1 bg-blue-600 mt-2"></div>
      </div>

      <div className="overflow-hidden  group py-10 relative">
        <div>
          <Carousel
            className="rounded-xl "
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute md:top-2/4 md:left-4 md:-translate-y-2/4 top-36 left-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="black"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute md:top-2/4 md:!right-4 md:-translate-y-2/4 top-36 right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="black"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
          >
            {[...testimonials].map((testimonial, index) => (
              <div className="flex items-center  justify-center md:px-10 w-full font-nunito shadow-md">
                <div className="md:px-10 text-center ">
                  <div
                    key={index}
                    className="p-6  w-full  overflow-hidden  group flex flex-col gap-4 rounded-lg  cursor-pointer "
                    // style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
                  >
                    <p className="text-gray-800 md:text-lg text-sm ">
                      "{testimonial.text}"
                    </p>
                    <p className=" font-semibold   ">{testimonial.name}</p>
                    <div className="flex items-center justify-center w-full">
                      <div className="flex items-center justify-center p-1 bg-blue-600 rounded-full w-14 h-14 shadow-md">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          height={50}
                          width={50}
                          className="rounded-full  border-2 border-white"
                        />
                      </div>
                    </div>

                    <p className="text-sm   text-gray-700 ">
                      {testimonial.post}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
