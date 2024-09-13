"use client";
import { events, eventTour } from "@/utils/config";
import { settings, URL } from "@/utils/constants";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Card } from "@material-tailwind/react";
import Slider from "react-slick";
import toast, { Toaster } from "react-hot-toast";
import PageCardWithText from "@/components/card/PageCardWithText";
import Link from "next/link";

const page = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [loading, setLoading] = useState(true);

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
  const imageUrl = eventData?.TourImages[0].image_path;

  return (
    <div className="h-2/5 w-full md:px-16 md:py-6">
      <Toaster />
      <div className=" h-full w-full md:grid md:grid-cols-[2fr,1fr] grid-rows-4 gap-8 ">
        <div className=" md:h-full relative row-span-2 h-52 mt-4 md:mt-0 rounded-md overflow-hidden ">
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

        <div className=" h-full row-span-1  md:p-0 p-4">
          <div className="flex flex-col  ">
            <h1 className="md:text-3xl text-lg font-bold text-blue-900 ">
              {eventData?.TourName}
            </h1>

            <div className="flex flex-col md:mt-8 mt-4">
              <div className="flex items-center justify-start gap-2">
                <span>
                  <FaRegCalendarAlt />
                </span>
                <span>{eventData?.EventTourStartDate} Onwards</span>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-center justify-start gap-2">
                <span>
                  <FiMapPin />
                </span>
                <span>Multiple venue</span>
              </div>
            </div>
            {eventData?.EventTourlowestPrice && (
              <p className="mt-6 font-bold text-xl ">
                &#8377; {eventData?.EventTourlowestPrice}
              </p>
            )}
          </div>
        </div>

        <div className=" h-full row-span-3 py-6 px-4 ">
          <div className="border border-gray-400 rounded-md p-2">
            <h1 className="md:text-2xl font-bold  text-lg">About</h1>
            <div
              className="md:mt-4 mt-2 text-sm"
              dangerouslySetInnerHTML={{ __html: eventData?.TourDescription }}
            ></div>
          </div>
        </div>

        <div className="h-full w-full ">
          <div className="border-t-2 py-4  h-full border-gray-400 w-full  overflow-hidden ">
            <Slider {...settings}>
              {eventData?.TourImages.map((img) => {
                return (
                  <div
                    key={img._id}
                    className="w-max-96 h-52 relative cursor-pointer overflow-hidden  p-2"
                  >
                    <div className="w-full h-full relative">
                      <Image
                        src={`${URL}/${img.image_path}`}
                        alt="carousel-image"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                        className="rounded"
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
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
      </div>

      <div className=" w-full flex h-96 mt-10">
        {eventData?.TourEvents.map((event) => (
          <div key={event._id} className="px-2 mt-6 w-80">
            <Link href={`/events/${event.event_id}`}>
              <PageCardWithText event={event} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
