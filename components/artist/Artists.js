"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Cards from "../card/Cards";
import Link from "next/link";
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
      setAllArtists(response.data.data);
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

  const cardsData = allArtists?.slice(0, 8);

  if (loading) return <Loading />;

  return (
    <div className=" md:py-2 mt-6  md:mt-6 mb-10 md:mb-20sm:px-4 px-1 overflow-hidden md:px-4 ">
      {/* headers */}
      <CardHeaders
        mobileHeader="Browse by Artists"
        desktopHeader="Browse events by artists"
        mobileText="See all"
        desktopText="Discover more artists"
        url="/artists"
      />

      {/* cards */}
      <div className="px-2 ">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            425: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 9,
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
