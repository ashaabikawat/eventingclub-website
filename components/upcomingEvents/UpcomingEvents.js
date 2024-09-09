"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import CardWithText from "../card/CardWithText";
import { initialLength, settings } from "@/utils/constants";
import axios from "axios";
import { getAllUpcomingEvents } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await axios.get(getAllUpcomingEvents);
      console.log(response.data.data);
      setUpcomingEvents(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cardsData = upcomingEvents.slice(0, 8);

  return (
    <div className="w-full sm:px-8 md:px-14  px-6  mb-2 overflow-hidden">
      <CardHeaders
        mobileHeader="Upcoming Events"
        desktopHeader="Upcoming Events"
        mobileText="See all"
        desktopText="Discover upcoming events"
        url="/upcomingEvents"
      />
      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="mt-8">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className="px-2 mt-6">
                <CardWithText data={data} />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default UpcomingEvents;
