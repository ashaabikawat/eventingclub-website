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

const Page = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [tourEvent, setTourEvent] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [showMore, setShowMore] = useState(false);

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
    <div className="mb-14 ">
      <Toaster />
      <div className="md:px-10 md:py-1">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6  md:p-4 ">
          <div className=" md:col-span-2 md:min-h-[600px] relative md:row-span-2  max-h-[300px] ">
            {loadings ? (
              "Loading ..."
            ) : imageUrl ? (
              <div className=" md:aspect-auto aspect-square  ">
                <Image
                  src={`${URL}/${imageUrl}`}
                  alt="image"
                  layout="fill"
                  className="absolute md:rounded-xl    overflow-hidden"
                />
              </div>
            ) : (
              "Loading ..."
            )}
          </div>

          <div className=" md:px-2 md:py-4 md:col-span-1 md:min-h-[400px] px-4 ">
            <div className="flex flex-col">
              <h1 className="md:text-3xl mb-2 text-xl font-bold text-blue-900 capitalize">
                {eventData?.TourName}
              </h1>

              <div className="flex flex-col md:mt-6 mt-6">
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
                  <span>Multiple Venue</span>
                </div>
              </div>
              {eventData?.EventTourlowestPrice && (
                <p className="mt-6 font-bold text-xl">
                  &#8377; {eventData?.EventTourlowestPrice}
                </p>
              )}
            </div>
          </div>

          <div className=" hidden md:block md:col-span-2 min-h-[200px]  border-t-2  border-gray-500">
            <div className=" min-h-[200px] md:w-[90%] mx-auto">
              <Swiper
                spaceBetween={2}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                className="mt-3"
              >
                {eventData?.TourImages.map((img) => {
                  return (
                    <SwiperSlide
                      key={img.id}
                      navigation={true}
                      modules={[Navigation]}
                    >
                      <div
                        key={img.id}
                        className="max-w-[300px] h-52 relative cursor-pointer overflow-hidden p-2"
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
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          {eventData?.TourDescription !== null && (
            <div className=" md:min-h-[400px] md:col-span-1  md:row-span-2 md:-mt-[300px] order-3 md:order-2  px-4">
              <div className="  md:h-[550px] border border-gray-500 rounded-lg px-4 py-6 ">
                <h1 className="md:text-2xl font-bold">About</h1>
                <div
                  className={`md:mt-4 mt-2 text-base md:min-h-[200px] transition-all ${
                    showMore ? "max-h-auto" : "max-h-[150px]"
                  } overflow-hidden`}
                  dangerouslySetInnerHTML={{
                    __html: eventData?.TourDescription,
                  }}
                ></div>
                <button
                  className="mt-4 text-blue-700 font-semibold"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          )}

          {/* event */}
          <div className=" min-h-[20px] md:col-span-2  rounded-lg col-span-1 px-4 order-2 md:order-3 ">
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

        <div className=" mt-8">
          <div className=" px-4 md:px-4 grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
            {tourEvent?.map((tour) => (
              <div className=" ">
                <PageCardWithText event={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
