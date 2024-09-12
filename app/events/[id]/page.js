"use client";
import { events } from "@/utils/config";
import { URL } from "@/utils/constants";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Cards from "@/components/card/Cards";
import { Card } from "@material-tailwind/react";

const page = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_ALL}`, payload);
      console.log(response.data.data);
      setEventData(response.data.data);
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
          // console.log(error.response);
          toast.error(data.message);
        }
      }
    }
  };

  const imageUrl = eventData?.EventCarouselImages[0].image_path;

  return (
    <div className="h-2/5 w-full md:px-16 md:py-6">
      <div className=" h-full w-full md:grid md:grid-cols-[2fr,1fr] grid-rows-4 gap-8 ">
        <div className=" md:h-full relative row-span-3 h-52 mt-4 md:mt-0 rounded-md overflow-hidden ">
          {loading ? (
            "Loading ..."
          ) : imageUrl ? (
            <Image
              src={`${URL}/${imageUrl}`}
              alt="image"
              layout="fill"
              className="absolute"
            />
          ) : (
            "Loading ..."
          )}
        </div>
        <div className=" h-full row-span-2  md:p-0 p-4">
          <div className="flex flex-col  ">
            <h1 className="md:text-3xl text-lg font-bold text-blue-900 ">
              {eventData?.EventName}
            </h1>
            <div className="flex gap-1 md:mt-6 mt-4 md:text-base">
              <span className=" border-r-2 border-gray-400 pr-2">
                {eventData?.categoryName}
              </span>
              {eventData?.Language.map((lang) => (
                <span className="border-r-2 border-gray-400 pr-2">{lang}</span>
              ))}
              <span>{eventData?.BestSuitedFor}</span>
            </div>
            <div className="flex flex-col md:mt-6 mt-4">
              <div className="flex items-center justify-start gap-2">
                <span>
                  <FaRegCalendarAlt />
                </span>
                <span>{eventData?.EventStartDate}</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-center justify-start gap-2">
                <span>
                  <FiMapPin />
                </span>
                <span>{eventData?.EventStartTime}</span>
              </div>
            </div>
            {eventData?.TicketPriceStartsFrom && (
              <p className="mt-6 font-bold text-xl ">
                &#8377; {eventData?.TicketPriceStartsFrom} Onwards
              </p>
            )}
            <button className="w-[150px] mt-4 whitespace-nowrap inline-flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm md:text-xl text-lg font-medium text-white bg-blue-800 ">
              Book now
            </button>
          </div>
        </div>

        <div className=" h-full row-span-3 py-6 px-4 ">
          <div className="border border-gray-400 rounded-md p-2">
            <h1 className="md:text-2xl font-bold  text-lg">About</h1>
            <div
              className="md:mt-4 mt-2 text-sm"
              dangerouslySetInnerHTML={{ __html: eventData?.AboutEvent }}
            ></div>
          </div>
        </div>

        <div className=" h-full ">
          <div className="border border-gray-400">
            <div className="h-full">image carousel</div>
          </div>
        </div>

        <div className="">
          <div className="border border-gray-400 py-5 px-3 rounded-md flex flex-col gap-2">
            <p className="md:text-xl font-bold tracking-wide">
              Share this event
            </p>
            <div className="flex gap-3 mt-2">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span>
                <IoLogoWhatsapp />
              </span>
            </div>
          </div>
        </div>

        <div className=" h-full border border-gray-400">gallery</div>
        <div className=" h-full border border-gray-400">map</div>

        <div className="col-span-2 h-full md:p-0 p-4">
          <div className="flex  gap-6">
            {eventData?.EventArtists.map((artist, index) => (
              <Card
                key={index}
                className="md:h-60 h-56 w-52 relative cursor-pointer overflow-hidden"
              >
                <div className="h-full relative">
                  <Image
                    src={`${URL}/${artist?.ArtistImage}`}
                    alt="profile-picture"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    className="rounded"
                  />
                </div>
                {/* Ensure text is visible and positioned within the card */}
                <div className="absolute inset-x-2 bottom-2 ">
                  <p className="text-white text-sm md:text-base text-center">
                    {artist?.ArtistName}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
