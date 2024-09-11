"use client";

import Cards from "@/components/card/Cards";
import PageCardWithText from "@/components/card/PageCardWithText";
import useFetch from "@/hooks/useFetch";
import { artists, getArtistById } from "@/utils/config";
import { settings, URL } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

const page = () => {
  const { id } = useParams();
  const [singleArtists, setSingleArtists] = useState();
  const [otherArtists, setOtherArtists] = useState([]);
  const [artistEvents, setArtistEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const payload = {
      artist_id: id,
    };
    try {
      const response = await axios.post(`${artists.ARTIST_BY_ID}`, payload);
      // console.log(response.data.data);
      setSingleArtists(response.data.data.currentArtist);
      setArtistEvents(response.data.data.currentArtistEvents);
      setOtherArtists(response.data.data.otherArtists);
      console.log("upcoming evemts", response.data.data.currentArtistEvents);
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
          toast.error(data.message);
        }
      }
    }
  };
  const imageUrl = `${URL}/${singleArtists?.Images[0]?.image_path}`;

  const cardsData = otherArtists?.slice(0, 5);

  return (
    <>
      <div className="md:py-6 md:px-14 p-6 mt-9">
        <div className="flex md:flex-row items-center gap-10 border-b-2 pb-6 border-gray-300 flex-col  ">
          <div className="h-64 w-64 relative">
            {loading ? (
              "Loading ..."
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              "Loading ..."
            )}
          </div>
          <div className="w-4/5 md:w-3/5 flex  flex-col justify-center md:text-left text-center">
            <h1 className="mb-4 text-3xl font-bold">{singleArtists?.Name}</h1>
            <p className="text-sm md:text-base">{singleArtists?.Description}</p>
          </div>
        </div>
      </div>
      <div className="md:py-6 md:px-14 p-6 mt-2 ">
        <h1 className="font-bold capitalize text-3xl ">Upcoming events:</h1>
        <div>
          {artistEvents && artistEvents.length > 0 ? (
            <Slider {...settings}>
              {artistEvents.map((event) => (
                <div key={event._id} className="px-2 mt-6 w-full">
                  <PageCardWithText event={event} />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="mt-4 ">No events available</p>
          )}
        </div>
      </div>
      <div className="md:py-6 md:px-14 p-6 mt-2 ">
        <div className="flex justify-between">
          <h1 className="font-bold capitalize text-3xl ">Other artists:</h1>
          <Link href="/artists">
            <p className="text-lg">View all</p>
          </Link>
        </div>
        <div className=" ">
          <div className="flex mt-12">
            {cardsData?.map((artist) => {
              return (
                <div
                  key={artist._id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
                >
                  <Link href={`/artists/${artist._id}`}>
                    <Cards data={artist} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
