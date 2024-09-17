"use client";
import { events } from "@/utils/config";
import { settings, URL } from "@/utils/constants";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "@/components/common/loading/Loading";

const Page = () => {
  const { id } = useParams();
  console.log(id);
  const [eventData, setEventData] = useState();
  const [loadings, setLoadings] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
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
  const imageUrl = eventData?.EventCarouselImages[0].image_path;

  if (loadings) return <Loading />;

  return (
    <div className="   mb-16">
      <div className="md:px-6 md:py-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:p-4 ">
          <div className=" md:col-span-2 md:min-h-[400px] relative md:row-span-2 max-h-[300px] ">
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
          <div className=" md:px-2 md:py-4 md:col-span-1 md:min-h-[400px] px-4   ">
            <div className="flex flex-col">
              <h1 className="md:text-3xl mb-2 text-xl font-bold text-blue-900 capitalize">
                {eventData?.EventName}
              </h1>
              <div className="flex gap-1 md:mt-6 mt-4 md:text-base">
                <span className="border-r-2 border-black pr-2 capitalize">
                  {eventData?.categoryName}
                </span>
                {eventData?.Language.map((lang) => (
                  <span
                    className="border-r-2 border-black pr-2 capitalize"
                    key={lang}
                  >
                    {lang}
                  </span>
                ))}
                <span>{eventData?.BestSuitedFor}</span>
              </div>
              <div className="flex flex-col md:mt-6 mt-6">
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
                <p className="mt-6 font-bold text-xl">
                  &#8377; {eventData?.TicketPriceStartsFrom} Onwards
                </p>
              )}
              <button
                className="w-[150px] mt-8 whitespace-nowrap inline-flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm md:text-xl text-lg font-medium text-white bg-blue-800"
                // onClick={() => console.log(`/events/tickets/${id}`)}
                onClick={() => router.push(`/events/tickets/${id}`)}
              >
                Book now
              </button>
            </div>
          </div>

          {/* carousel images */}

          <div className=" mt-4 md:col-span-2 md:min-h-[200px]   ">
            <div className=" hidden md:block min-h-[200px] md:w-[90%] mx-auto border-t-2   border-gray-500">
              <Swiper
                spaceBetween={2}
                slidesPerView={3}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
                className="mt-3"
              >
                {eventData?.EventCarouselImages.map((img) => {
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
            {/* share */}
            <div className=" min-h-[20px] md:col-span-2 mt-6 rounded-lg col-span-1 px-4 order-2 md:order-3 ">
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

          {/* about */}
          {/* <div className=" md:col-span-1 order-3 md:order-2 lg:-mt-32  px-4">
            <div className=" md:min-h-[300px] lg:h-[550px] border border-gray-500 rounded-lg px-4 py-6 ">
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

          {/* gallery */}
          <div className="min-h-[200px] md:col-span-2  px-4 order-5 md:order-4">
            <div className="border border-gray-500 rounded-lg">
              <h1 className="md:text-xl mt-4 px-4 font-bold">Gallery</h1>
              <div className=" h-auto md:w-[90%] mx-auto mb-4">
                <Swiper
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  className="mt-3 
                "
                >
                  {eventData?.EventGalleryImages.map((img) => {
                    return (
                      <SwiperSlide
                        key={img.id}
                        navigation={true}
                        modules={[Navigation]}
                      >
                        <div
                          key={img.id}
                          className="md:w-full w-[90%] mx-auto md:mx-0  md:h-80 h-56  relative cursor-pointer overflow-hidden "
                        >
                          <div className="w-full h-full relative">
                            <Image
                              src={`${URL}/${img.image_path}`}
                              alt="carousel-image"
                              layout="fill"
                              objectFit="cover"
                              objectPosition="top"
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>

          {/* maps */}
          <div className=" min-h-[100px]  order-4 md:order-5 px-4 ">
            <div className="border border-gray-500 rounded-lg  ">
              <h1 className="md:text-xl px-4 mt-4 font-bold">
                {eventData?.VenueCity !== "-"
                  ? eventData?.VenueCity
                  : eventData?.VenueName}
              </h1>
              <p className=" px-4 mt-2 capitalize mb-4">
                {eventData?.VenueName}
              </p>
              <div className=" md:min-h-[200px] h-auto   md:w-[90%] w-[90%] mx-auto mb-4 ">
                {eventData?.VenueMapLocationLink && (
                  <div className="">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=${eventData?.VenueMapLocationLink}`}
                      // src="https://www.google.com/maps/embed?pb=https://g.co/kgs/mDZKz4e"
                      className="w-full md:h-64  h-52  rounded-lg"
                      frameborder="0"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
