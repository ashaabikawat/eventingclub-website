"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { getBanner } from "@/utils/config";
import { URL } from "@/utils/constants";
import ShimmerCard from "../card/ShimmerCard";

const Hero = () => {
  const [banner, setBanner] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

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
    <Carousel
      className="h-96 mt-4 w-full "
      autoplay="true"
      autoplayDelay="3000"
      loop="true"
    >
      {loading ? (
        <div className="p-2 mt-8">
          <ShimmerCard />
        </div>
      ) : (
        banner.map((banner) => (
          <>
            <Image
              src={
                isMobile
                  ? `${URL}/${banner.MobilebannerImage}`
                  : `${URL}/${banner.DesktopbannerImage}`
              }
              alt="image 1"
              className="h-full relative"
              layout="fill"
              objectFit="cover"
            />
            <div className="flex items-center justify-center inset-x-0 bottom-14  absolute ">
              <h1 className="text-white md:text-6xl text-4xl font-bold">
                Live in concert
              </h1>
              {isMobile
                ? console.log(`${URL}/${banner.MobilebannerImage}`)
                : console.log(`${URL}/${banner.DesktopbannerImage}`)}
            </div>
          </>
        ))
      )}
    </Carousel>
  );
};

export default Hero;
