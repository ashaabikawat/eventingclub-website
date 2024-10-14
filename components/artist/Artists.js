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
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../common/loading/Loading";

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

  if (loading) return <Loading />;

  return (
    <div className=" md:py-2 mt-6  md:mt-6 mb-4 sm:px-4 px-1 overflow-hidden md:px-4 ">
      <CardHeaders
        mobileHeader="Browse by Artists"
        desktopHeader="Browse events by artists"
        mobileText="See all"
        desktopText="Discover more artists"
        url="/artists"
      />
      <div className="px-2">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          // className="mt-3 "
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 16,
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
              <div key={data.id} className="md:mt-6 mt-4 ">
                <Link href={`/artists/${data._id}`}>
                  <Cards data={data} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Artists;
