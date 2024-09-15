"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import { initialLength, settings, URL } from "@/utils/constants";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import { eventTour, featuredEvents } from "@/utils/config";
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
      // console.log(response.data.data);
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
          // console.log(error.response);
          toast.error(data.message);
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
    <div className="md:py-4 mb-8 sm:px-8 px-1 overflow-hidden md:px-14">
      <CardHeaders
        mobileHeader="Event Tour"
        desktopHeader="Event Tour"
        mobileText="See all"
        desktopText="Discover event tour"
        url="/eventTour"
      />
      <div className="px-2">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          // className="mt-3 "
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            425: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3.5,
              // spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 20,
            },
          }}
        >
          {cardsData.map((data) => (
            <SwiperSlide key={data.id}>
              <div key={data.id} className="md:px-2 md:mt-6 mt-4">
                <Link href={`/eventtour/${data.Tour_id}`}>
                  <Card className="w-full h-52 relative cursor-pointer overflow-hidden  ">
                    <div className="w-full h-full relative  ">
                      <Image
                        src={`${URL}/${data?.EventCardImages[0]?.image_path}`}
                        alt="profile-picture"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                        className="rounded"
                      />
                    </div>
                  </Card>
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
