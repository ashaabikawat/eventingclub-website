"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Slider from "react-slick";
import Cards from "../card/Cards";
import { initialLength, settings, URL } from "@/utils/constants";
import Link from "next/link";
import ShimmerCard from "../card/ShimmerCard";
import axios from "axios";
import { artists } from "@/utils/config";

const Artists = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    try {
      const response = await axios.get(artists.GET_ALL);
      console.log(response.data.data);
      setAllArtists(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cardsData = allArtists?.slice(0, 8);

  return (
    <div className=" md:px-14  sm:px-8 px-6 md:mt-14 overflow-hidden ">
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
              <div key={index} className=" mt-8">
                <ShimmerCard />
              </div>
            ))
          : cardsData?.map((data) => (
              <div key={data.id} className="px-2 mt-6">
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
