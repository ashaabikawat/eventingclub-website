"use client";
import React from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import CardWithText from "../card/CardWithText";
import { settings } from "@/utils/constants";

const Featuredevents = () => {
  const data = [
    {
      id: 1,
      image: "img1",
      name: "sunburn ft.alan walker",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: true,
      price: "999",
    },
    {
      id: 2,
      image: "img2",
      name: "Echoes of Harmony",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: true,
      price: "999",
    },
    {
      id: 3,
      image: "img3",
      name: "Rhythm & Rhapsody",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: false,
      price: "999",
    },
    {
      id: 4,
      image: "img4",
      name: "Sonorous Nights",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: false,
      price: "999",
    },
    {
      id: 5,
      image: "img5",
      name: "Electric Vibes Live",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: false,
      price: "999",
    },
    {
      id: 6,
      image: "img6",
      name: "Symphony Under the Stars",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: false,
      price: "999",
    },
    {
      id: 7,
      image: "img7",
      name: "Vibrant Melodies Fest",
      date: "march 13",
      location: "Online broadcast",
      fastSelling: true,
      price: "999",
    },
  ];
  return (
    <div className=" md:px-4 md:py-6 mt-6 mb-8 overflow-hidden">
      <CardHeaders
        mobileHeader="Featured Events"
        desktopHeader="Featured Events"
        mobileText="See all"
        desktopText="Discover featured events"
        url="/featuredEvents"
      />
      <Slider {...settings}>
        {data.map((data) => (
          <div key={data.id} className="px-2 mt-6">
            <CardWithText data={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Featuredevents;
