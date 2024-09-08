"use client";
import PageHeader from "@/components/common/single page header/PageHeader";
import { VenueCard } from "@/components/venue card/VenueCard";
import useFetch from "@/hooks/useFetch";
import { getVenues } from "@/utils/config";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data } = useFetch(getVenues);

  return (
    <div className="px-8 mt-10 mb-10">
      <PageHeader text="Pick your venue:" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 w-full mt-8 md:px-14">
        {data.map((data) => (
          <Link href="/venue/1" key={data._id}>
            <VenueCard data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
