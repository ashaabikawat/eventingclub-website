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
import PageCardWithText from "@/components/card/PageCardWithText";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { register } from "swiper/element/bundle";
import Link from "next/link";

register();

const Page = () => {
  const { id } = useParams();
  const swiperRef = useRef(null);
  const galleryRef = useRef(null);

  const [eventData, setEventData] = useState();
  const [suggestedEvents, setSuggestedEvents] = useState([]);

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
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      };

      // Initialize Swiper
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    } else {
    }
  }, [swiperRef, eventData]);

  useEffect(() => {
    const swiperContainer = galleryRef.current;

    // Check if swiperContainer is defined
    if (swiperContainer) {
      const params = {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: true,
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
        autoplay: {
          delay: 2000, // Delay in milliseconds
          disableOnInteraction: false, // Autoplay continues after user interactions
        },
      };

      // Initialize Swiper
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    } else {
    }
  }, [galleryRef, eventData]);

  const [artists, setArtists] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    fetchEvent();
  }, []);
  const fetchEvent = async () => {
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_ALL}`, payload);

      setEventData(response.data.data.EventDetailsObj);
      setArtists(response.data.data.EventArtists);
      setSuggestedEvents(response.data.data.suggestedEvents);
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

  const handleBookNow = () => {
    if (!eventData?.WhatsAppPhoneNumber) {
      router.push(`/events/tickets/${id}`);
    } else {
      router.push(`https://wa.me/91${eventData?.WhatsAppPhoneNumber}`);
    }
  };

  if (loadings) return <Loading />;

  return (
    <div className="   mb-16">
      <div className="md:px-6 md:py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6  gap-4  md:p-4 ">
          <div className="   ">
            {loadings ? (
              "Loading ..."
            ) : imageUrl ? (
              <div className=" h-full w-full ">
                <Image
                  src={`${URL}/${imageUrl}`}
                  alt="image"
                  height={500}
                  width={800}
                  className="md:w-[1000px] md:h-[400px] 
                   sm:w-[700px] sm:h-[450px]  /* Adjust for smaller screens */
                   lg:w-[1000px] lg:h-[400px] /* Adjust for larger screens */
                   xl:w-[1200px] xl:h-[400px] md:rounded-xl "
                  objectFit="cover
                  "
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
                onClick={handleBookNow}
              >
                Book now
              </button>
            </div>
          </div>

          {/* carousel images */}
          <div className="mt-4 flex flex-col h-full w-full justify-between relative">
            <div className="md:flex hidden h-auto   border-t-2 border-gray-500 flex-col gap-4">
              <div className=" h-full w-full mt-4 relative px-10 py-1 ">
                <swiper-container
                  ref={swiperRef}
                  init="false"
                  slides-per-view="3"
                  space-between="40"
                >
                  {eventData?.EventCarouselImages.map((img) => (
                    <swiper-slide key={img.id}>
                      <div className="  ">
                        <Image
                          src={`${URL}/${img.image_path}`}
                          alt="carousel-image"
                          // layout="fill"
                          height={300}
                          width={500}
                          objectFit="cover"
                          // objectPosition="top"
                          className="rounded-lg "
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

          <div className="min-h-[20px] rounded-lg order-2 md:order-3 px-4 md:px-0">
            <div className="py-4 px-4 rounded-md flex border border-gray-500 flex-col gap-2">
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

          <div className="px-4 order-3  md:px-0 md:order-2 row-span-2 ">
            <div className="border h-full border-gray-500 rounded-lg px-4 ">
              <div className=" h-full  py-6  ">
                <h1 className="md:text-2xl font-bold">About</h1>

                <div className="max-h-[300px] overflow-y-auto">
                  <ReactQuill
                    readOnly
                    value={eventData?.AboutEvent}
                    modules={{ toolbar: false }}
                    className="text-black font-medium "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* gallery */}

          {eventData?.EventGalleryImages.length > 0 && (
            <div className="order-5 md:order-4 md:px-0 px-4">
              <div className="border border-gray-500 h-full rounded-lg px-4">
                <h1 className="md:text-xl mt-4 font-bold">Gallery</h1>
                <div className="py-4">
                  <swiper-container
                    ref={galleryRef}
                    init="false"
                    slides-per-view="1"
                    space-between="40"
                  >
                    {eventData?.EventGalleryImages.map((img) => (
                      <swiper-slide key={img.id}>
                        <div className="h-full w-full">
                          {" "}
                          {/* Fixed container size */}
                          <Image
                            src={`${URL}/${img.image_path}`}
                            alt="carousel-image"
                            height={325} // Fixed height
                            width={600} // Fixed width
                            objectFit="cover" // Ensures the image covers the container
                            className="rounded-lg"
                          />
                        </div>
                      </swiper-slide>
                    ))}
                  </swiper-container>
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
                <div className="md:max-h-full lg:h-[300px] h-[200px] w-full mb-4">
                  {eventData?.VenueMapLocationLink && (
                    <div className="h-full w-full overflow-hidden">
                      <div
                        className="-h-full w-full"
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

        {/* accordion */}
        <div className="md:mt-14 mt-10 px-6">
          {Boolean(eventData?.VenueEventFlag && eventData?.VenueLayout) && (
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
              <AccordionBody className="h-full w-full ">
                {eventData?.VenueLayout !== undefined && (
                  <div className=" h-[500px] w-full relative ">
                    <Image
                      src={`${URL}/${eventData?.VenueLayout}`}
                      alt=""
                      objectFit="contain"
                      layout="fill"
                      className="absolute"
                    />
                  </div>
                )}
              </AccordionBody>
            </Accordion>
          )}

          {Boolean(eventData?.EventFaqs?.length > 0) && (
            <Accordion open={open === 2} className="mt-2">
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
                {eventData?.EventFaqs.map((faq) => (
                  <div className="mb-4 flex flex-col gap-2">
                    <p className="font-semibold text-black flex items-center">
                      -{faq.Question}
                    </p>
                    <p>{faq.Answer}</p>
                  </div>
                ))}
              </AccordionBody>
            </Accordion>
          )}

          <Accordion open={open === 3} className="mt-2">
            <AccordionHeader
              className="flex w-full  justify-between "
              onClick={() => handleOpen(3)}
            >
              <p className="flex-grow md:text-2xl text-black">
                Terms and conditions
              </p>
              <span className="ml-auto">
                <MdKeyboardArrowDown size={30} />
              </span>
            </AccordionHeader>
            <AccordionBody>
              {/* <div className="h-full w-full ">
                <div
                  className="h-full w-full"
                  dangerouslySetInnerHTML={{
                    __html: eventData?.EventTermsConditions,
                  }}
                />
              </div> */}
              <ReactQuill
                readOnly
                value={eventData?.EventTermsConditions}
                modules={{ toolbar: false }}
                className="text-black font-medium"
              />
            </AccordionBody>
          </Accordion>
        </div>

        <div className=" md:mt-24 mt-14   px-4 md:px-4  ">
          <h1 className="font-semibold capitalize md:text-3xl text-xl ">
            You may also like
          </h1>
          <div>
            <Swiper
              spaceBetween={6}
              slidesPerView={1}
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
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
              {suggestedEvents.map((event) => (
                <SwiperSlide key={event.id}>
                  <div key={event._id} className=" mt-6 ">
                    <Link href={`/events/${event.event_id}`}>
                      <PageCardWithText event={event} />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
