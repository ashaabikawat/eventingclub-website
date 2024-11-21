"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getBanner } from "@/utils/config";
import { URL } from "@/utils/constants";
import { register } from "swiper/element/bundle";
import axios from "axios";

register();

const Hero = () => {
  const [banner, setBanner] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

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
    }
  }, [swiperRef, banner]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(getBanner);
      setBanner(response.data.data);
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
          setLoading(false);
        }
      }
    }
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

  if (loading) return;

  return (
    <div className=" h-full w-full">
      <div className=" h-full  w-full">
        <swiper-container
          ref={swiperRef}
          init="false"
          slides-per-view="1"
          space-between="10"
        >
          {banner?.map((banner) => (
            <swiper-slide key={banner.id}>
              <div className="h-full w-full  relative  ">
                <Image
                  src={
                    isMobile
                      ? `${URL}/${banner?.MobilebannerImage}`
                      : `${URL}/${banner?.DesktopbannerImage}`
                  }
                  alt="carousel-image"
                  objectFit="cover"
                  height={isMobile ? 1080 : 500}
                  width={isMobile ? 1920 : 2000}
                />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
};

export default Hero;
