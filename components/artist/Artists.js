"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import Cards from "../card/Cards";
import useFetch from "@/hooks/useFetch";

const Artists = () => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/getall`;

  const { data, loading, error } = useFetch(URL);
  console.log(data.map((data) => console.log(data)));

  return (
    <div className="md:py-12 md:px-14 p-6 ">
      <div className="flex justify-between items-center">
        <h1 className=" capitalize font-bold">Browse events by categories</h1>
        <div className="flex justify-between items-center gap-2">
          <span className="capitalize ">
            {window.innerHeight < "600px"
              ? "Discover more category"
              : "See all"}
          </span>
          <ChevronRightIcon className="size-2" />
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 w-full mt-8 ">
        {data.map((data) => (
          <Cards key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

//   console.log(data.Images.map((image) => console.log(image.image_path)))

export default Artists;
