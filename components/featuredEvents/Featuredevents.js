"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import CardWithText from "../card/CardWithText";
import { initialLength, settings } from "@/utils/constants";
import axios from "axios";
import { featuredEvents } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const Featuredevents = () => {
  const [allFeaturedEvents, setAllFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const response = await axios.post(featuredEvents.GET_ALL);
      console.log(response.data.data);
      setAllFeaturedEvents(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cardsData = allFeaturedEvents?.slice(0, 8);

  if (loading) return;

  if (allFeaturedEvents.length === 0 && !loading) {
    return null;
  }

  return (
    <div className=" mt-6 mb-2 sm:px-8 px-1 overflow-hidden md:px-14">
      <CardHeaders
        mobileHeader="Featured Events"
        desktopHeader="Featured Events"
        mobileText="See all"
        desktopText="Discover featured events"
        url="/featuredEvents"
      />

      <div className="px-2">
        <Swiper
          spaceBetween={6}
          slidesPerView={5}
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
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 4,
            },
          }}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          // className="mt-3 "
        >
          {cardsData.map((data) => (
            <SwiperSlide key={data.id}>
              <div key={data.id} className="px-2 mt-6 h-80">
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

export default Featuredevents;
