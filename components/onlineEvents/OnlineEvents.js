"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import CardWithText from "../card/CardWithText";
import { initialLength, settings } from "@/utils/constants";
import axios from "axios";
import { onlineEvents } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";

const OnlineEvents = () => {
  const [allOnlineEvents, setAllOnlineEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOnlineEvents();
  }, []);

  const fetchOnlineEvents = async () => {
    try {
      const response = await axios.post(onlineEvents.GET_ALL);
      console.log(response.data.data);
      setAllOnlineEvents(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const cardsData = allOnlineEvents?.slice(0, 8);

  return (
    <div className=" md:px-14 sm:px-8 px-6 mt-10 mb-16 overflow-hidden">
      <CardHeaders
        mobileHeader="Online Events"
        desktopHeader="Online Events"
        mobileText="See all"
        desktopText="Discover online events"
        url="/onlineEvents"
      />

      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="mt-8">
                <ShimmerCard />
              </div>
            ))
          : allOnlineEvents?.map((data) => (
              <div key={data.id} className="px-2 mt-6">
                <CardWithText data={data} />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default OnlineEvents;
