"use client";

import Cards from "@/components/card/Cards";
import PageCardWithText from "@/components/card/PageCardWithText";
import Loading from "@/components/common/loading/Loading";
import { artists } from "@/utils/config";
import { URL } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";

const Page = () => {
  const { id } = useParams();
  const [singleArtists, setSingleArtists] = useState();
  const [otherArtists, setOtherArtists] = useState([]);
  const [artistEvents, setArtistEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    toast.dismiss();
    const payload = {
      artist_id: id,
    };
    try {
      const response = await axios.post(`${artists.ARTIST_BY_ID}`, payload);

      setSingleArtists(response.data.data.currentArtist);
      setArtistEvents(response.data.data.currentArtistEvents);
      setOtherArtists(response.data.data.otherArtists);
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
          setLoading(false);
        }
      }
    }
  };
  const imageUrl = `${URL}/${singleArtists?.Images[0]?.image_path}`;

  const cardsData = otherArtists?.slice(0, 5);

  if (loading) return <Loading />;

  return (
    <div className="font-nunito">
      {/* artist detail */}
      <div className="md:py-10 md:px-6 py-10 ">
        <div className="flex md:flex-row items-center md:gap-10 gap-2   flex-col  ">
          <div className=" md:h-64 md:w-64 h-52 w-52 relative">
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
            <h1 className="mb-4 md:text-3xl text-xl text-blue-900  font-semibold">
              {singleArtists?.Name}
            </h1>
            <p className="text-sm md:text-base">{singleArtists?.Description}</p>
          </div>
        </div>
      </div>

      {/* upcoming events */}
      <div className="md:py-6 mt-2 border-t-2 md:pt-10  border-gray-300 px-4 md:px-6 py-4 ">
        <h1 className="font-semibold capitalize md:text-3xl text-xl font-poppins ">
          Upcoming events:
        </h1>
        <div>
          {artistEvents && artistEvents.length > 0 ? (
            <Swiper
              spaceBetween={6}
              slidesPerView={1}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                425: {
                  slidesPerView: 2.2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3.2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4.2,
                  spaceBetween: 10,
                },
              }}
            >
              {artistEvents
                ?.filter((items) => items?.EventCardImages[0]?.image_path)
                ?.map((event) => (
                  <SwiperSlide key={event.id}>
                    <div key={event._id} className=" mt-6 ">
                      <Link href={`/events/${event.event_id}`}>
                        <PageCardWithText event={event} />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <p className="mt-6 mb-32 text-xl ">No upcoming events</p>
          )}
        </div>
      </div>

      {/* other artists */}
      <div className=" md:px-6 md:mt-4 mt-8 px-4 pb-12 ">
        <div className="flex justify-between items-center">
          <h1 className="font-bold capitalize md:text-3xl text-xl font-poppins ">
            Other artists:
          </h1>
          <Link href="/artists">
            <p className="md:text-lg text-base">View all</p>
          </Link>
        </div>
        <div className=" ">
          <div className=" md:mt-8 mt-4">
            {" "}
            <Swiper
              spaceBetween={6}
              slidesPerView={1}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 10,
                },
                425: {
                  slidesPerView: 2.2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3.2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4.5,
                  spaceBetween: 10,
                },
              }}
            >
              {cardsData
                ?.filter((items) => items?.Images[0]?.image_path)
                ?.map((artist) => {
                  return (
                    <SwiperSlide key={artist.id}>
                      <div key={artist._id} className="w-full ">
                        <Link href={`/artists/${artist._id}`}>
                          {/* <Cards data={artist} /> */}
                          <div className="w-full h-full cursor-pointer flex justify-center items-center flex-col  overflow-hidden">
                            {/* image */}
                            <Image
                              src={`${URL}/${artist?.Images[0]?.image_path}`}
                              alt="profile-picture"
                              objectFit="cover"
                              height={300}
                              width={300} // Remove width prop for automatic sizing
                              className="rounded" // Apply rounded-full directly to Image component
                            />

                            {/* data */}
                            <div className="flex justify-center items-center mt-2">
                              <p className=" text-xs text-center md:text-sm font-semibold">
                                {artist.Name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
