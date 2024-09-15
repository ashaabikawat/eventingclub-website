"use client";
import React, { useEffect, useState } from "react";
import ShortTicket from "./ShortTicket";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";

const TicketsSlider = ({ data, setShowTicket, showTicket }) => {
  console.log("data", data);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div className="p-4 md:px-8">
      <div className="md:px-6">
        <h1 className="md:text-3xl  text-xl md:mt-0 mt-4 capitalize text-blue-900 font-bold border-b-2 border-gray-200 pb-3">
          {data?.EventName}
        </h1>
        <div>
          <p className="capitalize mt-4  text-xl font-bold ">Select date:</p>

          {isMobile ? (
            <Swiper
              spaceBetween={6}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className="mt-3 "
            >
              {data?.DateTimeDate.map((ticket, index) => (
                <SwiperSlide key={data.id}>
                  <div
                    key={index}
                    className="md:mt-0 mt-4 cursor-pointer "
                    onClick={() => setShowTicket(!showTicket)}
                  >
                    <ShortTicket data={ticket} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="mt-4 flex gap-4">
              {data?.DateTimeDate.map((ticket) => (
                <div
                  key={ticket.id}
                  className="cursor-pointer "
                  onClick={() => setShowTicket(!showTicket)}
                >
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
