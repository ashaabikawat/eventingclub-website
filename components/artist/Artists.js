"use client";
import React from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import Cards from "../card/Cards";
import { initialLength, settings, URL } from "@/utils/constants";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { getArtists } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";

const Artists = () => {
  const { data, loading, error } = useFetch(getArtists);
  const cardsData = data.slice(0, 8);

  return (
    <div className="md:py-6 md:px-14 p-6 ">
      <CardHeaders
        mobileHeader="Browse by Artists"
        desktopHeader="Browse events by artists"
        mobileText="See all"
        desktopText="Discover more artists"
        url="/artists"
      />
      {/* <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-6 w-full mt-8 "> */}
      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="p-2 mt-8">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className="p-2 mt-8">
                <Link href={`/artists/${data._id}`}>
                  <Cards data={data} />
                </Link>
              </div>
            ))}
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default Artists;
