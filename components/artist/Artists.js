"use client";
import React, { useEffect, useState } from "react";
import CardHeaders from "../common/card headers/CardHeaders";
import Cards from "../card/Cards";
import Link from "next/link";
import axios from "axios";
import { artists } from "@/utils/config";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../common/loading/Loading";
import Image from "next/image";
import { URL } from "@/utils/constants";

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
    <div className=" md:py-2 mt-12 mb-12 overflow-hidden px-6 md:px-6 ">
      {/* headers */}
      <CardHeaders
        mobileHeader="Browse by Artists"
        desktopHeader="Browse events by artists"
        mobileText="See all"
        desktopText="Discover more artists"
        url="/artists"
      />

      {/* cards */}
      <div className="px-2">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            425: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {cardsData?.map((data) => (
            <SwiperSlide key={data.id}>
              <div key={data.id} className="md:mt-6 mt-4 rounded">
                <Link href={`/artists/${data._id}`}>
                  {/* <Cards data={data} /> */}
                  <div className="w-full h-full cursor-pointer flex justify-center items-center flex-col  overflow-hidden">
                    {/* image */}
                    <Image
                      src={`${URL}/${data?.Images[0].image_path}`}
                      alt="profile-picture"
                      objectFit="cover"
                      height={300}
                      width={300} // Remove width prop for automatic sizing
                      className="rounded" // Apply rounded-full directly to Image component
                    />

                    {/* data */}
                    <div className="flex justify-center items-center mt-2">
                      <p className=" text-xs text-center md:text-sm font-semibold">
                        {data.Name}
                      </p>
                    </div>
                  </div>
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
