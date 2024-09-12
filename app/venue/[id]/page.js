"use client";
import { venues } from "@/utils/config";
import { URL } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const [venueData, setVenueData] = useState();
  const [loading, setLoading] = useState(false);
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
  console.log(imageUrl);

  return (
    <div className="w-full h-full ">
      <Toaster />
      <div className=" w-full h-full  ">
        <div className=" w-full h-full  lg:border-b-2 lg:border-gray-200 ">
          <div className="relative w-full h-52 md:mb-8 mb-6">
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
              <h1 className="lg:text-2xl md:text-xl  font-bold capitalize mb-4 text-blue-900">
                {venueData?.venueName}
              </h1>
              <p className="mb-4 md:text-base text-xs">
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
        <div></div>
      </div>
    </div>
  );
};

export default page;
