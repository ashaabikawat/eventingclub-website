"use client";
import SearchInput from "@/components/common/SearchInput";
import PageHeader from "@/components/common/single page header/PageHeader";
import { VenueCard } from "@/components/venue card/VenueCard";
import useFetch from "@/hooks/useFetch";
import { getVenues } from "@/utils/config";
import React from "react";

const page = () => {
  const { data } = useFetch(getVenues);

  return (
    <div className="p-8 md:p-14">
      <PageHeader text="Pick your venue:" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 w-full mt-8 cursor-pointer">
        {data.map((data) => (
          <VenueCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default page;
