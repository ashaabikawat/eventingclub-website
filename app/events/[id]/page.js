"use client";
import { events } from "@/utils/config";
import { settings, URL } from "@/utils/constants";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "@/components/common/loading/Loading";
import { Card } from "@material-tailwind/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { register } from "swiper/element/bundle";

register();

const Page = () => {
  const { id } = useParams();
  const swiperRef = useRef(null);

  const [eventData, setEventData] = useState();
  useEffect(() => {
    const swiperContainer = swiperRef.current;

    // Check if swiperContainer is defined
    if (swiperContainer) {
      const params = {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: true,
      };

      // Initialize Swiper
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    } else {
      console.error("Swiper reference is null");
    }
  }, [swiperRef, eventData]);

  console.log(swiperRef);

  // console.log(id);
  const [artists, setArtists] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // console.log(artists);
  console.log(eventData);

  useEffect(() => {
    fetchEvent();
  }, []);
  const fetchEvent = async () => {
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_ALL}`, payload);
      // console.log(response.data.data);
      setEventData(response.data.data);
      setArtists(response.data.data.EventArtists);
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6  gap-4  md:p-4 ">
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
          <div className=" md:px-2 md:py-4  md:min-h-[400px] px-4   ">
            <div className="flex flex-col">
              <h1 className="md:text-3xl  text-xl font-bold text-blue-900 capitalize">
                {eventData?.EventName}
              </h1>
              <div className="flex gap-1 md:mt-6 mt-4 md:text-base">
                <span className="border-r-2 border-gray-800 pr-2 text-gray-800 capitalize">
                  {eventData?.categoryName}
                </span>
                {eventData?.Language.map((lang) => (
                  <span
                    className="border-r-2 border-gray-800 pr-2 text-gray-800  capitalize"
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
                className="w-[150px] z-50 mt-8 whitespace-nowrap inline-flex items-center justify-center p-3 border border-transparent rounded-md shadow-sm md:text-xl text-lg font-medium text-white bg-blue-800"
                // onClick={() => console.log(`/events/tickets/${id}`)}
                onClick={() => router.push(`/events/tickets/${id}`)}
              >
                Book now
              </button>
            </div>
          </div>

          {/* carousel images */}
          <div className="mt-4 flex flex-col h-full w-full justify-between relative">
            <div className="md:flex hidden h-auto   border-t-2 border-gray-500 flex-col gap-4">
              <div className=" h-full w-full mt-4 relative px-10 py-1 ">
                {/* <div className="bg-yellow-500 h-52 w-52 "></div>
                <div className="bg-yellow-500 h-52 w-52 "></div>
                <div className="bg-yellow-500 h-52 w-52 "></div> */}

                <swiper-container
                  ref={swiperRef}
                  init="false"
                  slides-per-view="3"
                  space-between="40"
                >
                  {eventData?.EventCarouselImages.map((img) => (
                    <swiper-slide key={img.id}>
                      <div className="h-52 w-52  relative ">
                        <Image
                          src={`${URL}/${img.image_path}`}
                          alt="carousel-image"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="top"
                          className="rounded-lg absolute"
                        />
                      </div>
                    </swiper-slide>
                  ))}
                </swiper-container>
              </div>
              {/* Swiper buttons */}
              <div
                style={{ color: "black" }}
                className="swiper-button-prev absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-20 rounded-full flex items-center justify-center h-20 w-10 "
              >
                <MdOutlineKeyboardArrowLeft />
              </div>
              <div
                style={{ color: "black" }}
                className="swiper-button-next absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center h-20 w-10"
              >
                <MdOutlineKeyboardArrowRight />
              </div>

              {/* Share section */}
            </div>
          </div>

          <div className="min-h-[20px] rounded-lg order-2 md:order-3">
            <div className="py-4 px-6 rounded-md flex border border-gray-500 flex-col gap-2">
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

          {/* about */}
          {/* <div className=" px-4 ">
            <div className=" rounded-lg border border-gray-500  ">
            
            </div>
          </div> */}

          <div className="px-4 order-3  md:px-0 md:order-2 row-span-2 ">
            <div className="border h-full border-gray-500 rounded-lg px-4">
              <div className=" h-auto  py-6 ">
                <h1 className="md:text-2xl font-bold">About</h1>
                <div
                  className={`md:mt-4 mt-2 text-base md:min-h-[200px] transition-all ${
                    showMore ? "max-h-auto" : "max-h-[150px]"
                  } overflow-hidden`}
                  dangerouslySetInnerHTML={{ __html: eventData?.AboutEvent }}
                ></div>
              </div>
            </div>
          </div>

          {/* gallery */}
          {/* {eventData?.EventGalleryImages.length > 0 && (
            <div className=" md:-2 md:mt-4 lg:mt-10 px-4 order-5 md:order-4">
              <div className="border border-gray-500 rounded-lg">
                
                
              </div>
            </div>
          )} */}
          {eventData?.EventGalleryImages.length > 0 && (
            <div className="h-auto order-5 md:order-4 md:px-0 px-4 ">
              <div className="border border-gray-500 h-full rounded-lg px-4">
                <h1 className="md:text-xl mt-4  font-bold">Gallery</h1>
                <div className=" h-auto md:w-[100%] mb-4">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={12}
                    // onSlideChange={() => console.log("slide change")}
                    // onSwiper={(swiper) => console.log(swiper)}
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
          )}

          {/* maps */}

          {eventData?.VenueMapLocationLink && (
            <div className="h-auto md:-2 order-4 md:order-5 px-4 md:px-0">
              <div className="border border-gray-500 rounded-lg h-full px-4">
                <h1 className="md:text-xl mt-4 font-bold">
                  {eventData?.VenueCity !== "-"
                    ? eventData?.VenueCity
                    : eventData?.VenueName}
                </h1>
                <p className="mt-2 capitalize mb-4">{eventData?.VenueName}</p>
                <div className="md:min-h-[200px] h-[200px] w-full mb-4">
                  {eventData?.VenueMapLocationLink && (
                    <div className="h-full w-full overflow-hidden">
                      <div
                        className="h-full w-full"
                        dangerouslySetInnerHTML={{
                          __html: eventData?.VenueMapLocationLink,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="mt-8 px-6">
          <h1 className="md:text-3xl font-semibold text-xl">Artists:</h1>
          <div className="mt-6">
            <swiper-container
              ref={swiperRef}
              init="false"
              spaceBetween={6}
              slidesPerView={5}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              // className="mt-3 "
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
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {artists?.map((artist) => (
                <swiper-slide key={artist.id}>
                  <Card className="w-full md:h-60  h-52 relative cursor-pointer overflow-hidden">
                    <div className="w-full h-full relative  ">
                      <Image
                        src={`${URL}/${artist?.ArtistImage}`}
                        alt="profile-picture"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                        className="rounded "
                      />
                    </div>

                    <div className="absolute inset-x-4 bottom-6">
                      <p className="text-white text-sm md:text-base">
                        {artist?.ArtistName}
                      </p>
                    </div>
                  </Card>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div> */}

        {/* accordion */}
        <div className="md:mt-14 mt-10 px-6">
          <Accordion open={open === 1}>
            <AccordionHeader
              className="flex w-full  justify-between "
              onClick={() => handleOpen(1)}
            >
              <p className="flex-grow md:text-2xl text-black">Venue layout</p>
              <span className="ml-auto">
                <MdKeyboardArrowDown size={30} />
              </span>
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion>

          {eventData?.EventFaqs?.length > 0 && (
            <Accordion open={open === 2} className="mt-8">
              <AccordionHeader
                className="flex w-full  justify-between "
                onClick={() => handleOpen(2)}
              >
                <p className="flex-grow md:text-2xl text-black">FAQs</p>
                <span className="ml-auto">
                  <MdKeyboardArrowDown size={30} />
                </span>
              </AccordionHeader>
              <AccordionBody>
                We&apos;re not always in the position that we want to be at.
                We&apos;re constantly growing. We&apos;re constantly making
                mistakes. We&apos;re constantly trying to express ourselves and
                actualize our dreams.
              </AccordionBody>
            </Accordion>
          )}

          <Accordion open={open === 3} className="mt-8">
            <AccordionHeader
              className="flex w-full  justify-between "
              onClick={() => handleOpen(3)}
            >
              <p className="flex-grow md:text-2xl text-black">
                Terms and condtions
              </p>
              <span className="ml-auto">
                <MdKeyboardArrowDown size={30} />
              </span>
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default Page;
