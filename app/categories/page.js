"use client";
import Cards from "@/components/card/Cards";
import SearchInput from "@/components/common/SearchInput";
import useFetch from "@/hooks/useFetch";
import React from "react";

const page = () => {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/getall`;
  const { data } = useFetch(URL);

  return (
    <div className="p-6 md:p-14">
      <div className="flex flex-col md:flex-row justify-between  gap-4">
        <h1 className=" font-bold">Explore Events By Categories</h1>
        <div className="md:w-96">
          <SearchInput />
        </div>
      </div>
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-6 w-full mt-8 ">
        {data.map((data) => (
          <Cards key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default page;
