"use client";
import Cards from "@/components/card/Cards";
import ShimmerCard from "@/components/card/ShimmerCard";
import SearchInput from "@/components/common/SearchInput";
import PageHeader from "@/components/common/single page header/PageHeader";
import useFetch from "@/hooks/useFetch";
import { getArtists } from "@/utils/config";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data } = useFetch(getArtists);

  return (
    <div className="p-8 md:p-4">
      <PageHeader text="Explore events by artists:" />
      <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-6 w-full mt-8 cursor-pointer">
        {data.map((data) => (
          <Link key={data.id} href={`/artists/${data._id}`}>
            <Cards data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
