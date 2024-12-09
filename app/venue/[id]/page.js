"use client";
import PageCardWithText from "@/components/card/PageCardWithText";
import { venues } from "@/utils/config";
import { settings, URL } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "@/components/common/loading/Loading";

const Page = () => {
  const [venueData, setVenueData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [venueEventsdata, setVenueEventsdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchVenueData();
  }, []);

  const fetchVenueData = async () => {
    toast.dismiss();
    const payload = {
      venue_id: id,
    };
    try {
      const response = await axios.post(`${venues.GET_BY_ID}`, payload);

      setVenueData(response.data.data);
      setVenueEventsdata(response.data.data.venueEvents);
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

  const imageUrl = venueData?.venueImages[0]?.image_path;

  return (
    <div className="w-full h-full overflow-x-hidden md:px-6 pt-10 mb-12  font-nunito ">
      <Toaster />
      <div className=" w-full h-full  ">
        <div className=" w-full h-full  lg:border-b-2 lg:border-gray-200 grid md:grid-cols-2">
          <div className="relative w-full h-[500px] md:mb-8 mb-6">
            {isLoading ? (
              <Loading />
            ) : imageUrl ? (
              <Image
                src={`${URL}/${imageUrl}`}
                alt="image"
                layout="fill"
                objectPosition="top center"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              <Loading />
            )}
          </div>
          <div className="flex  lg:gap-4  md:gap-2 flex-col px-4  gap-4 ">
            {/* venue details */}
            <div className="  w-full h-[200px] border-b-2 border-gray-300 lg:border-none  md:border-none ">
              <h1 className="md:text-3xl text-2xl  font-bold capitalize mb-4 text-blue-900 font-poppins">
                {venueData?.venueName}
              </h1>
              <p className="mb-4 md:text-lg text-base">
                {venueData?.venueAddress}
              </p>
              <div className="max-h-20 overflow-y-auto">
                <p className="md:mb-6 mb-4 text-gray-600 text-sm">
                  {venueData?.venueDescription}
                </p>
              </div>
            </div>

            {/* map */}
            <div className=" w-full  h-[260px]  mb-6">
              <div className="h-full w-full overflow-hidden">
                <div
                  className=" w-full"
                  dangerouslySetInnerHTML={{
                    __html: venueData?.venueMapLocation,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-bold mt-4 px-4 text-xl  md:text-3xl capitalize font-bold font-poppins ">
            upcoming events at this venue:
          </h1>
          {venueEventsdata && venueEventsdata.length > 0 ? (
            <div className="px-4">
              <Swiper
                spaceBetween={6}
                slidesPerView={1}
                breakpoints={{
                  320: {
                    slidesPerView: 1.5,
                    spaceBetween: 14,
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
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {venueEventsdata
                  ?.filter((items) => items?.EventCardImages[0]?.image_path)
                  ?.map((event) => (
                    <SwiperSlide key={event.id}>
                      <div key={event._id} className=" md:mt-8 mt-6 w-full">
                        <Link href={`/events/${event.event_id}`}>
                          <PageCardWithText event={event} />
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          ) : (
            <p className="mt-4 px-4 ">No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
