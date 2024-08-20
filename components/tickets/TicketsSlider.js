"use client";
import React, { useEffect, useState } from "react";
import ShortTicket from "./ShortTicket";
import Slider from "react-slick";
import { settings } from "@/utils/constants";

const TicketsSlider = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log("Resizing:", window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      console.log(isMobile);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="p-4 md:p-8 ">
      <div>
        <div>
          <h1 className="md:text-3xl capitalize text-blue-900 font-bold border-b-2 border-gray-200 pb-3   ">
            Suburn arena ft. alan walker - pune
          </h1>
          <div>
            <p className="capitalize mt-4 text-xl">Select date:</p>
            {isMobile ? (
              <Slider {...settings}>
                {data.map((data) => (
                  <div key={data.id} className="">
                    <ShortTicket data={data} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="mt-4 flex gap-4 ">
                {data.map((data) => (
                  <div key={data.id}>
                    <ShortTicket data={data} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsSlider;
