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

  return (
    <div className=" md:px-14 sm:px-8 px-6 mt-16 mb-16 overflow-hidden">
      <CardHeaders
        mobileHeader="Featured Events"
        desktopHeader="Featured Events"
        mobileText="See all"
        desktopText="Discover featured events"
        url="/featuredEvents"
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
                <Link href={`/events/${data.event_id}`}>
                  <CardWithText data={data} />
                </Link>
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default Featuredevents;
