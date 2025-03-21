"use client";
import { events } from "@/utils/config";
import { URL } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "@/components/common/loading/Loading";
import PageCardWithText from "@/components/card/PageCardWithText";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { LuClock } from "react-icons/lu";
import { RiMapPinLine } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { register } from "swiper/element/bundle";
import Link from "next/link";
import { Carousel, IconButton } from "@material-tailwind/react";

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
  }, [eventData]);

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
          // toast.error(data.message);
        }
      }
    }
  };
  const imageUrl = eventData?.EventCarouselImages[0].image_path;
  const mergedImages = [
    ...(eventData?.EventCarouselImages || []),
    ...(eventData?.EventGalleryImages || []),
  ];

  const handleBookNow = () => {
    if (!eventData?.WhatsAppPhoneNumber) {
      router.push(`/events/tickets/${id}`);
    } else {
      router.push(`https://wa.me/91${eventData?.WhatsAppPhoneNumber}`);
    }
  };

  if (loadings) return <Loading />;

  return (
    <div className=" relative h-full mb-8 font-Atkinson">
      <div className=" md:py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6  gap-4  md:p-4 ">
          <div className="   ">
            {loadings ? (
              "Loading ..."
            ) : eventData?.EventCarouselImages ? (
              <div className=" h-full w-full ">
                <swiper-container
                  space-between="20"
                  autoplay='{"delay": 3000, "disableOnInteraction": false}' // Autoplay enabled with a 3-second delay
                  loop="true"
                >
                  {mergedImages?.map((img) => (
                    <swiper-slide key={img.id}>
                      <Image
                        src={`${URL}/${img.image_path}`}
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
                    </swiper-slide>
                  ))}
                </swiper-container>
              </div>
            ) : (
              "Loading ..."
            )}
          </div>
          {/* event details */}
          <div className=" md:px-2 md:py-4  md:min-h-[400px] px-4   ">
            <div className="flex flex-col">
              <h1 className="md:text-3xl  text-xl font-bold text-blue-900 capitalize font-poppins">
                {eventData?.EventName}
              </h1>
              <div className="flex gap-1 md:mt-6 mt-1 text-sm md:text-base">
                <span className="border-r-2 border-gray-800 pr-2 text-gray-800 capitalize">
                  {eventData?.categoryName}
                </span>
                {eventData?.Language.slice(0, 2).map((lang) => (
                  <span
                    className="border-r-2 text-sm md:text-base  border-gray-800 pr-2 text-gray-800  capitalize"
                    key={lang}
                  >
                    {lang}
                  </span>
                ))}
                <span className="text-sm md:text-base">
                  {eventData?.BestSuitedFor}
                </span>
              </div>
              <div className="flex flex-col md:mt-6 mt-4">
                <div className="flex items-center justify-start gap-2">
                  <span>
                    <FaRegCalendarAlt />
                  </span>
                  <span className="text-sm md:text-base">
                    {eventData?.EventStartDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-1 md:mt-4">
                <div className="flex items-center justify-start gap-2">
                  <span>
                    <LuClock />
                  </span>
                  <span className="text-sm md:text-base">
                    {eventData?.EventStartTime}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-1 md:mt-4">
                <div className="flex items-center justify-start gap-2">
                  <span>
                    <RiMapPinLine />
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base">
                      {eventData?.VenueCity !== "-"
                        ? eventData?.VenueCity
                        : eventData?.VenueName}
                    </span>
                  </div>
                </div>
              </div>
              {eventData?.TicketPriceStartsFrom && (
                <p className="mt-6 font-bold text-xl">
                  &#8377; {eventData?.TicketPriceStartsFrom} Onwards
                </p>
              )}
              <button
                className="w-[150px] hidden md:flex z-50 mt-8 whitespace-nowrap items-center justify-center p-3 border border-transparent rounded-md shadow-sm md:text-xl text-lg font-medium text-white bg-blue-800"
                onClick={handleBookNow}
              >
                Book now{" "}
                {eventData?.WhatsAppPhoneNumber && (
                  <FaWhatsapp className="ml-2" />
                )}
              </button>
            </div>
          </div>
          {/* carousel images */}
          {/* <div className="mt-4 flex flex-col h-full w-full justify-between relative">
            <div className="md:flex hidden h-auto   border-t-2 border-gray-500 flex-col gap-4">
              <div className=" h-full w-full mt-4 relative px-10 py-1 "> */}
          {/* <swiper-container
                  ref={swiperRef}
                  init="false"
                  // slides-per-view="3"
                  // space-between="20"
                >
                  {eventData?.EventGalleryImages?.map((img) => (
                    <swiper-slider key={img.id}>
                      <div className="  ">
                        <Image
                          src={`${URL}/${img.image_path}`}
                          alt="carousel-image"
                          // layout="fill"
                          height={200}
                          width={200}
                          objectFit="cover"
                          // objectPosition="top"
                          className="rounded-lg "
                        />
                      </div>
                    </swiper-slider>
                  ))}
                </swiper-container> */}
          {/* <Carousel className="rounded-xl">
                  {eventData?.EventGalleryImages?.map((img) => (
                    <>
                      <Image
                        src={`${URL}/${img.image_path}`}
                        height={400}
                        width={500}
                      />
                    </>
                  ))}
                </Carousel> */}
          {/* <Carousel
                  prevArrow={({ handlePrev }) => (
                    <IconButton
                      variant="text"
                      color="black"
                      size="lg"
                      onClick={handlePrev}
                      className="!absolute top-2/4 left-0 -translate-y-2/4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </IconButton>
                  )}
                  nextArrow={({ handleNext }) => (
                    <IconButton
                      variant="text"
                      color="black"
                      size="lg"
                      onClick={handleNext}
                      className="!absolute top-2/4 right-0 -translate-y-2/4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </IconButton>
                  )}
                  className="rounded-xl" */}

          {/* {eventData?.EventGalleryImages?.map((img, index) => {
                    // Group images into slides of 2
                    const isEvenIndex = index % 2 === 0;
                    if (!isEvenIndex) return null; // Skip odd indices as they'll be grouped

                    return (
                      <div key={index} className="flex justify-center gap-4">
                      
                        <div className="">
                          <Image
                            src={`${URL}/${img.image_path}`}
                            alt={`Image ${index + 1}`}
                            height={300}
                            width={230}
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>

                     
                        {eventData.EventGalleryImages[index + 1] && (
                          <div className="relative ">
                            <Image
                              src={`${URL}/${
                                eventData.EventGalleryImages[index + 1]
                                  .image_path
                              }`}
                              alt={`Image ${index + 2}`}
                              height={300}
                              width={230}
                              objectFit="cover"
                              className="rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div> */}

          {/* Share section */}
          <div className="min-h-[20px] rounded-lg order-2 md:order-2 px-4 md:px-0 ">
            <div className="py-4 px-4 rounded-md flex gap-4 justify-between md:justify-normal items-center border border-gray-500">
              <p className="md:text-xl font-bold tracking-wide">
                Share this event
              </p>
              <div className="flex gap-3">
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
            <div className="border h-full border-gray-500 rounded-lg  ">
              <div className=" h-full  py-6  ">
                <h1 className="md:text-2xl font-bold px-4">Description</h1>

                <div className="max-h-[300px] overflow-y-auto">
                  <ReactQuill
                    readOnly
                    value={eventData?.AboutEvent}
                    modules={{ toolbar: false }}
                    className="text-black font-medium font-Atkinson "
                  />
                </div>
              </div>
            </div>
          </div>
          {/* gallery */}

          {/* {eventData?.EventGalleryImages.length > 0 && (
            <div className="order-5 md:order-4 md:px-0 px-4">
              <div className="border border-gray-500 h-full rounded-lg px-4">
                <h1 className="md:text-xl mt-4 font-bold">Gallery</h1>
                <div className="py-4">
              
                  <Carousel className="rounded-xl">
                    {eventData?.EventGalleryImages.map((img) => (
                      <Image
                        src={`${URL}/${img.image_path}`}
                        alt="carousel-image"
                        height={200} // Fixed height
                        width={600} // Fixed width
                        // layout="fill"
                        objectFit="cover" // Ensures the image covers the container
                        className="rounded-lg"
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          )} */}

          {/* maps */}
          {eventData?.VenueMapLocationLink && (
            <>
              <div
                className={` md:block hidden  h-auto md:-2 order-4 md:order-5 px-4 md:px-0`}
              >
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
            </>
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
                <p className="flex-grow md:text-2xl text-black font-poppins">
                  Venue layout
                </p>
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
                <p className="flex-grow md:text-2xl text-black font-poppins">
                  FAQs
                </p>
                <span className="ml-auto">
                  <MdKeyboardArrowDown size={30} />
                </span>
              </AccordionHeader>
              <AccordionBody className="font-Atkinson">
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
              className="flex w-full  justify-between font-Atkinson"
              onClick={() => handleOpen(3)}
            >
              <p className="flex-grow md:text-2xl text-lg text-black ">
                Terms and conditions
              </p>
              <span className="ml-auto">
                <MdKeyboardArrowDown size={25} />
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

        <div className=" md:mt-16 mt-14 md:pb-0 pb-10  px-4 md:px-4  ">
          <h1 className="font-semibold capitalize md:text-3xl text-xl  font-poppins">
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

        {/* <div className=" border border-gray-500 md:hidden fixed bottom-20 shadow-md z-50 w-full h-16 p-2">
          <div className=" w-80">
            <div>
              {eventData?.TicketPriceStartsFrom && (
                <p className=" font-bold text-lg">
                  &#8377; {eventData?.TicketPriceStartsFrom}{" "}
                  <span className="font-normal text-sm">Onwards</span>
                </p>
              )}
            </div>
            <button
              className="  z-50 whitespace-nowrap items-center p-2 justify-center border border-transparent rounded-md shadow-sm md:text-xl text-base font-medium text-white bg-blue-800"
              onClick={handleBookNow}
            >
              Book now{" "}
              {eventData?.WhatsAppPhoneNumber && (
                <FaWhatsapp className="ml-2" />
              )}
            </button>
          </div>
        </div> */}
        <div className="w-full md:hidden justify-center z-50 items-center  fixed bottom-0  md:justify-end">
          <button
            className="bg-blue-900 w-full text-white p-3 text-xl font-bold  shadow-lg hover:shadow-xl hover:bg-blue-800 hover:scale-105  transition-all duration-300 ease-in-out"
            onClick={handleBookNow}
          >
            Book now{" "}
            {/* <span>{eventData?.WhatsAppPhoneNumber && <FaWhatsapp />}</span> */}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Page;
