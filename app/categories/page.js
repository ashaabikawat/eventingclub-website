"use client";
import Cards from "@/components/card/Cards";
import SearchInput from "@/components/common/SearchInput";
import useFetch from "@/hooks/useFetch";
import { getCategories } from "@/utils/config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

const page = () => {
  const { data } = useFetch(getCategories);

  return (
    <div className="p-8 md:p-14">
      <div className="flex flex-col md:flex-row justify-between  gap-4">
        <h1 className=" font-bold md:text-2xl ">
          Explore Events By Categories
        </h1>
        <div className="md:w-96">
          <SearchInput
            placeholder="Search for Events, Venues"
            icon={<MagnifyingGlassIcon />}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-6 w-full mt-8  cursor-pointer">
        {data.map((data) => (
          <Cards key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default page;
