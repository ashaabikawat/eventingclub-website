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
import Slider from "react-slick";

const Page = () => {
  const [venueData, setVenueData] = useState();
  const [loading, setLoading] = useState(false);
  const [venueEventsdata, setVenueEventsdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchVenueData();
  }, []);

  const fetchVenueData = async () => {
    const payload = {
      venue_id: id,
    };
    try {
      const response = await axios.post(`${venues.GET_BY_ID}`, payload);
      console.log(response.data.data);
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
          // console.log(error.response);
          toast.error(data.message);
        }
      }
    }
  };

  const imageUrl = venueData?.venueImages[0]?.image_path;
  // console.log(imageUrl);

  return (
    <div className="w-full h-full overflow-x-hidden md:px-16 px-2 ">
      <Toaster />
      <div className=" w-full h-full  ">
        <div className=" w-full h-full  lg:border-b-2 lg:border-gray-200 ">
          <div className="relative w-full h-80 md:mb-8 mb-6">
            {loading ? (
              "Loading ..."
            ) : imageUrl ? (
              <Image
                src={`${URL}/${imageUrl}`}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              "Loading ..."
            )}
          </div>
          <div className="flex justify-between lg:gap-20 md:gap-2 lg:flex-row flex-col px-4   ">
            <div className="  w-full border-b-2 border-gray-300 lg:border-none  md:border-none ">
              <h1 className="md:text-3xl text-2xl  font-bold capitalize mb-4 text-blue-900">
                {venueData?.venueName}
              </h1>
              <p className="mb-4 md:text-lg text-sm">
                {venueData?.venueAddress}
              </p>
              <p className="md:mb-6 mb-4 text-gray-600 text-sm">
                {venueData?.venueDescription}
              </p>
            </div>
            <div className="bg-orange-500 w-3/4 mt-4">
              <p>map</p>
            </div>
          </div>
        </div>
        <div>
          {/* {venueEventsdata.map((event) => (
            <PageCardWithText event={event} key={event.id} />
          ))} */}
          {venueEventsdata && venueEventsdata.length > 0 ? (
            <Slider {...settings}>
              {venueEventsdata.map((event) => (
                <div key={event._id} className="px-2 mt-6 w-full">
                  <Link href={`/events/${event.event_id}`}>
                    <PageCardWithText event={event} />
                  </Link>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="mt-4 ">No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
