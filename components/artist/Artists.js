"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Cards from "../card/Cards";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";

const Artists = () => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/getall`;

  const [isMobile, setIsMobile] = useState(false);

  const { data, loading, error } = useFetch(URL);

  const cardsData = data.slice(0, 5);

  console.log(data.map((data) => console.log(data)));
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:py-12 md:px-14 p-6 ">
      <div className="flex justify-between items-center">
        <h1 className=" capitalize font-bold md:text-2xl ">
          {isMobile
            ? "  Browse by categories"
            : "  Browse events by categories"}
        </h1>
        <div className="flex justify-between items-center gap-2">
          <Link href="/categories">
            <span className="capitalize sm:text-sm md:text-lg">
              {isMobile ? "See all" : "Discover more category"}
            </span>
          </Link>
          <ChevronRightIcon className="sm:size-2 md:size-4  " />
        </div>
      </div>
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-6 w-full mt-8 ">
        {cardsData.map((data) => (
          <Cards key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Artists;
