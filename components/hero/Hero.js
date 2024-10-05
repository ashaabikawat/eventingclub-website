"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { getBanner } from "@/utils/config";
import { URL } from "@/utils/constants";
import ShimmerCard from "../card/ShimmerCard";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { register } from "swiper/element/bundle";

register();

const Hero = () => {
  const [banner, setBanner] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  console.log(banner);

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
        autoplay: {
          delay: 3000, // Delay in milliseconds
          disableOnInteraction: false, // Autoplay continues after user interactions
        },
      };

      // Initialize Swiper
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    } else {
      console.error("Swiper reference is null");
    }
  }, [swiperRef, banner]);

  const fetchImages = async () => {
    const response = await fetch(getBanner);
    const data = await response.json();
    setBanner(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" h-96 md:h-[600px] mt-6 w-full">
      <div className=" h-full  w-full">
        <swiper-container
          ref={swiperRef}
          init="false"
          slides-per-view="1"
          space-between="10"
        >
          {banner?.map((banner) => (
            <swiper-slide key={banner.id}>
              <div className="h-96 md:h-[600px] w-full  relative  ">
                <Image
                  src={
                    isMobile
                      ? `${URL}/${banner.MobilebannerImage}`
                      : `${URL}/${banner.DesktopbannerImage}`
                  }
                  alt="carousel-image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  className=" absolute"
                />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
        <div className="flex items-center justify-center inset-x-0 md:-bottom-14 bottom-14  absolute  bg-opacity-50 p-4 z-50">
          <h1 className="text-white md:text-6xl text-4xl font-semibold">
            Live in concert
          </h1>
          {isMobile
            ? console.log(`${URL}/${banner.MobilebannerImage}`)
            : console.log(`${URL}/${banner.DesktopbannerImage}`)}
        </div>
      </div>
    </div>
  );
};

export default Hero;
