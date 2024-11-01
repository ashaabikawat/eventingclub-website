"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import { URL } from "@/utils/constants";
import axios from "axios";
import { eventTour } from "@/utils/config";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const TourEvents = () => {
  const [allEventTour, setAllEventTour] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventTour();
  }, []);

  const fetchEventTour = async () => {
    try {
      const response = await axios.post(eventTour.GET_ALL);
      setAllEventTour(response.data.data);
      setLoading(false);
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
          setLoading(false);
        }
      }
    }
  };

  const cardsData = allEventTour?.slice(0, 8);
  if (loading) return;

  if (allEventTour.length === 0 && !loading) {
    return null;
  }

  return (
    <div className=" sm:px-4 px-1 overflow-hidden md:px-4 ">
      {/* headers */}
      {/* <CardHeaders
        mobileHeader="Event Tour"
        desktopHeader="Event Tour"
        mobileText=""
        desktopText=""
        url=""
      /> */}
      <h1 className="px-2 capitalize text-base md:text-xl lg:text-3xl font-bold">
        Event tour
      </h1>

      {/* cards */}
      <div className="px-2">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            425: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 20,
            },
          }}
        >
          {cardsData.map((data) => (
            <SwiperSlide key={data.id}>
              <div key={data.id} className=" md:mt-6 mt-4">
                <Link href={`/eventtour/${data.Tour_id}`}>
                  <div className="w-full h-full relative cursor-pointer overflow-hidden  ">
                    <div className="w-full h-full relative  ">
                      <Image
                        src={`${URL}/${data?.EventCardImages[0]?.image_path}`}
                        alt="profile-picture"
                        height={375}
                        width={500}
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TourEvents;
