"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import CardWithText from "../card/CardWithText";
import { initialLength, settings, URL } from "@/utils/constants";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import { eventTour, featuredEvents } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";
import Link from "next/link";
import Image from "next/image";

const TourEvents = () => {
  const [allEventTour, setAllEventTour] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventTour();
  }, []);

  const fetchEventTour = async () => {
    try {
      const response = await axios.post(eventTour.GET_ALL);
      console.log(response.data.data);
      setAllEventTour(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const cardsData = allEventTour?.slice(0, 8);

  return (
    <div className="md:py-6 mt-6 mb-10 sm:px-8 px-1 md:mb-0  overflow-hidden">
      <CardHeaders
        mobileHeader="Event Tour"
        desktopHeader="Event Tour"
        mobileText="See all"
        desktopText="Discover event tour"
        url="/eventTour"
      />
      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="mt-8 px-2">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className="px-2 mt-6">
                <Link href={`/eventtour/${data.Tour_id}`}>
                  {/* <CardWithText data={data} /> */}
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
            ))}
      </Slider>
    </div>
  );
};

export default TourEvents;
