"use client";
import { SingleArtistCard } from "@/components/artist/SingleArtistCard";
import PageHeader from "@/components/common/single page header/PageHeader";
import useFetch from "@/hooks/useFetch";
import { getArtists } from "@/utils/config";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data } = useFetch(getArtists);
  // console.log(data);

  return (
    <div className=" md:px-10 mt-10 md:mb-10 px-10 ">
      <PageHeader text="Explore events by artists:" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-y-14   gap-x-8  w-full mt-8  md:px-14 cursor-pointer">
        {data.map((data) => (
          <Link key={data.id} href={`/artists/${data._id}`}>
            <SingleArtistCard data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
