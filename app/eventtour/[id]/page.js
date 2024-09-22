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
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import PageCardWithText from "@/components/card/PageCardWithText";
import Loading from "@/components/common/loading/Loading";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
} from "@material-tailwind/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";

const Page = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [tourEvent, setTourEvent] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [showMore, setShowMore] = useState(false);

  console.log(eventData);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const payload = {
      event_Tour_id: id,
    };
    try {
      const response = await axios.post(`${eventTour.GET_BY_ID}`, payload);
      console.log(response.data.data);
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
          // console.log(error.response);
          toast.error(data.message);
        }
      }
    }
  };
  const imageUrl = eventData?.TourImages[0].image_path;

  if (loadings) return <Loading />;

  return (
    <div className="   mb-16">
      <div className="md:px-6 md:py-1">
        <div className="md:p-4 ">
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
          <div className=" md:px-2 md:py-4 md:mt-0 mt-4  px-4   ">
            <div className="flex flex-col">
              <h1 className="md:text-3xl  text-xl font-bold text-blue-900 capitalize">
                {eventData?.TourName}
              </h1>
              <div className="flex gap-1  mt-4 md:text-base">
                {/* <span className="border-r-2 border-gray-800 pr-2 text-gray-800 capitalize">
                  {eventData?.categoryName}
                </span> */}
                {/* {eventData?.Language.map((lang) => (
                  <span
                    className="border-r-2 border-gray-800 pr-2 text-gray-800  capitalize"
                    key={lang}
                  >
                    {lang}
                  </span>
                ))} */}
                {/* <span>{eventData?.BestSuitedFor}</span> */}
              </div>
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

          {/* share */}
          <div className=" rounded-lg md:px-0 md:mt-4 px-4 mt-6">
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
          {/* </div>
          </div> */}

          {/* about */}
          {/* <div className="  order-3 md:order-2 lg:-mt-18  md:-mt-20 px-4">
            <div className=" md:h-[420px] lg:h-[420px] border border-gray-500 rounded-lg px-4 py-6 ">
              <h1 className="md:text-2xl font-bold">About</h1>
              <div
                className={`md:mt-4 mt-2 text-base md:min-h-[200px] transition-all ${
                  showMore ? "max-h-auto" : "max-h-[150px]"
                } overflow-hidden`}
                dangerouslySetInnerHTML={{ __html: eventData?.AboutEvent }}
              ></div>
              <button
                className="mt-4 text-blue-700 font-semibold"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Read More"}
              </button>
            </div>
          </div> */}
        </div>

        <div className="flex flex-wrap mt-6 lg:mt-10 px-4">
          {tourEvent?.map((event) => (
            <div className="md:mb-4 mb-4">
              <Link href={`/events/${event.event_id}`}>
                <Card className="md:h-80 md:w-80 h-36 w-36 relative cursor-pointer overflow-hidden">
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
