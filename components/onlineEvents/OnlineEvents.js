"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import CardWithText from "../card/CardWithText";
import axios from "axios";
import { onlineEvents } from "@/utils/config";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const OnlineEvents = () => {
  const [allOnlineEvents, setAllOnlineEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnlineEvents();
  }, []);

  const fetchOnlineEvents = async () => {
    try {
      const response = await axios.post(onlineEvents.GET_ALL);
      setAllOnlineEvents(response.data.data);
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

  const cardsData = allOnlineEvents?.slice(0, 8);

  if (loading) return;

  if (allOnlineEvents.length === 0 && !loading) {
    return null;
  }

  return (
    <div className=" mb-6  mt-2 md:mb-6  sm:px-4 px-1 overflow-hidden md:px-4">
      <CardHeaders
        mobileHeader="Online Events"
        desktopHeader="Online Events"
        mobileText="See all"
        desktopText="Discover online events"
        url="/onlineEvents"
      />

      <div className="px-3">
        <Swiper
          spaceBetween={6}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 20,
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
          {cardsData?.map((data) => (
            <SwiperSlide key={data.id}>
              <div key={data.id} className="  mt-4   ">
                <Link href={`/events/${data.event_id}`}>
                  <CardWithText data={data} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OnlineEvents;
