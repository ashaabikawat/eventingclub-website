"use client";
import { eventTour } from "@/utils/config";
import { URL } from "@/utils/constants";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import toast from "react-hot-toast";

import Loading from "@/components/common/loading/Loading";
import { Card } from "@material-tailwind/react";

import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";

const Page = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [tourEvent, setTourEvent] = useState([]);
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    toast.dismiss();
    const payload = {
      event_Tour_id: id,
    };
    try {
      const response = await axios.post(`${eventTour.GET_BY_ID}`, payload);

      setEventData(response.data.data);
      setTourEvent(response.data.data.TourEvents);

      setLoadings(false);
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
  const imageUrl = eventData?.TourImages[0].image_path;

  if (loadings) return <Loading />;

  return (
    <div className="  py-10 nunito">
      <div className="md:px-6 px-4">
        <div className="">
          <div className="md:grid grid-cols-2 gap-10">
            <div className=" md:min-h-[400px] relative  max-h-[300px]   ">
              {loadings ? (
                "Loading ..."
              ) : imageUrl ? (
                <div className=" md:aspect-auto  aspect-square ">
                  <Image
                    src={`${URL}/${imageUrl}`}
                    alt="image"
                    layout="fill"
                    className="absolute md:rounded-xl overflow-hidden"
                  />
                </div>
              ) : (
                "Loading ..."
              )}
            </div>

            {/* event details */}
            <div className=" md:px-2 md:py-4 md:mt-0 mt-4  px-2 ">
              <div className="flex flex-col">
                <h1 className="md:text-3xl  text-xl font-bold text-blue-900 capitalize bebas-neue">
                  {eventData?.TourName}
                </h1>
                <div className="flex gap-1  mt-4 md:text-base"></div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-start gap-2">
                    <span>
                      <FaRegCalendarAlt />
                    </span>
                    <span>{eventData?.EventTourStartDate}</span>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex items-center justify-start gap-2">
                    <span>
                      <FiMapPin />
                    </span>
                    <span>Multiple venues</span>
                  </div>
                </div>
                {eventData?.TicketPriceStartsFrom && (
                  <p className="mt-6 font-bold text-xl">
                    &#8377; {eventData?.EventTourlowestPrice} Onwards
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* share */}
          <div className=" rounded-lg md:px-0 md:mt-4 px-2 mt-6">
            <div className="    py-4 px-6 rounded-md flex border border-gray-500 flex-col gap-2">
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
        </div>

        <div className="flex flex-wrap mt-6 gap-4 lg:mt-10 md:px-0 px-2">
          {tourEvent
            ?.filter((items) => items?.EventCardImages[0]?.image_path)
            ?.map((event) => (
              <div className="md:mb-4 mb-4">
                <Link href={`/events/${event.event_id}`}>
                  <Card className="md:h-80 md:w-80 h-36 w-40 relative cursor-pointer overflow-hidden">
                    <div className="w-[100%] h-full relative">
                      <Image
                        src={`${URL}/${event?.EventCardImages[0]?.image_path}`}
                        alt="profile-picture"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                        className="rounded"
                      />
                    </div>
                  </Card>
                </Link>

                <div className="px-2">
                  <div className=" mt-2 h-auto  sm:mt-2 ">
                    <p className="text-sm capitalize  font-semibold md:text-lg">
                      {event.EventName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-3 lg:mt-1">
                    <div className="flex gap-2 items-center justify-start">
                      <span>
                        <CalendarIcon className="size-4 text-gray-900" />
                      </span>
                      <span className="text-xs md:text-sm lg:text-sm text-center capitalize text-gray-900">
                        {event.EventStartDate}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                      <span>
                        <MapPinIcon className="size-4 text-gray-900" />
                      </span>
                      <span className="text-xs md:text-sm  lg:text-sm text-left md:text-center capitalize text-gray-900 ">
                        {event.VenueName}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {event.LowestticketPrice && (
                      <span className="text-sm  md:text-base   font-semibold ">
                        &#8377; {event.LowestticketPrice} Onwards
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
