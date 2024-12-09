"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import axios from "axios";
import { featuredEvents } from "@/utils/config";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import CardFeatured from "../card/CardFeatured";

const Featuredevents = () => {
  const [allFeaturedEvents, setAllFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const response = await axios.post(featuredEvents.GET_ALL);
      setAllFeaturedEvents(response.data.data);
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

  const cardsData = allFeaturedEvents
    ?.filter((items) => items?.EventCardImages[0]?.image_path)
    ?.slice(0, 8);

  if (loading) return;

  if (allFeaturedEvents.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="  mt-12 md:mt-12 px-4 md:px-6  overflow-hidden ">
      {/* headers */}
      <CardHeaders
        mobileHeader="Featured Events"
        desktopHeader="Featured Events"
        mobileText="See all"
        desktopText="Discover featured events"
        url="/featuredEvents"
      />

      {/* cards */}
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
              <div key={data.id} className=" md:mt-6 mt-4   ">
                <Link href={`/events/${data.event_id}`}>
                  <CardFeatured data={data} />
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
