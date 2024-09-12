"use client";
import React, { useEffect, useState } from "react";
import ShortTicket from "./ShortTicket";
import Slider from "react-slick";

const TicketsSlider = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div>
        <h1 className="md:text-3xl text-xl md:mt-0 mt-4 capitalize text-blue-900 font-bold border-b-2 border-gray-200 pb-3">
          Suburn arena ft. alan walker - pune
        </h1>
        <div>
          <p className="capitalize mt-4  text-xl font-bold ">Select date:</p>

          {isMobile ? (
            // Wrap all ShortTickets inside a single Slider for mobile view
            <Slider slidesToShow={3}>
              {data.map((ticket, index) => (
                <div key={index} className="md:mt-0 mt-4 cursor-pointer">
                  <ShortTicket data={ticket} />
                </div>
              ))}
            </Slider>
          ) : (
            // Use flex layout for non-mobile screens
            <div className="mt-4 flex gap-4">
              {data.map((ticket) => (
                <div key={ticket.id} className="cursor-pointer ">
                  <ShortTicket data={ticket} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsSlider;
