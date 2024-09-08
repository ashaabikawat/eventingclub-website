"use client";

import useFetch from "@/hooks/useFetch";
import { getArtistById } from "@/utils/config";
import { URL } from "@/utils/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const page = () => {
  const { id } = useParams();
  const artistId = id;
  const requestBody = useMemo(() => ({ artist_id: artistId }), [artistId]);

  const { data, loading } = useFetch(getArtistById, "POST", requestBody);

  // console.log(data);

  // const imageUrl = `${URL}/${data?.Images?.[0]?.image_path}`;
  const imageUrl = data?.Images?.[0]?.image_path
    ? `${URL}/${data?.Images?.[0]?.image_path}`
    : null;

  // console.log(imageUrl);

  return (
    <div className="md:py-6 md:px-14 p-6 mt-9">
      <div className="flex md:flex-row items-center gap-10 border-b-2 pb-6 border-gray-300 flex-col  ">
        <div className="h-64 w-64 relative">
          {loading ? (
            "Loading ..."
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            "Loading ..."
          )}
        </div>
        <div className="w-4/5 md:w-3/5 flex  flex-col justify-center md:text-left text-center">
          <h1 className="mb-4 text-3xl font-bold">{data.Name}</h1>
          <p className="text-sm md:text-base">{data.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
