"use client";
import { SingleArtistCard } from "@/components/artist/SingleArtistCard";
import PageHeader from "@/components/common/single page header/PageHeader";
import useFetch from "@/hooks/useFetch";
import { artists, getArtists } from "@/utils/config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [artistsDuplicate, setArtistsDuplicate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    try {
      const response = await axios.get(artists.GET_ALL);
      // console.log(response.data.data);
      setAllArtists(response.data.data);
      setArtistsDuplicate(response.data.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebounced(searchKeyword);
    }, 700);

    return () => clearTimeout(delay);
  }, [searchKeyword]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debounced.length < 3) {
          toast.error("Search keyword must be at least 2 characters long.");
          return;
        }
        const payload = {
          search_keyword: debounced,
        };
        // console.log(payload);

        const response = await axios.post(artists.SEARCH_KEYWORD, payload);
        setArtistsDuplicate(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (
            status === 404 ||
            status === 403 ||
            status === 500 ||
            status === 302 ||
            status === 409 ||
            status === 401 ||
            status === 400
          ) {
            console.log(error.response);
            toast.error(data.message);
          }
        }
      }
    };
    if (debounced !== "") {
      fetchData();
    } else {
      setArtistsDuplicate(allArtists);
    }
  }, [debounced]);

  return (
    <div className=" md:px-10 mt-10 md:mb-10 px-10 ">
      <Toaster />
      {/* <PageHeader text="Explore events by artists:" /> */}
      <div className="flex flex-col md:flex-row justify-between  gap-4">
        <h1 className=" font-bold md:text-2xl ">Explore Events By Artists</h1>
        <div className="md:w-96">
          <label className="relative">
            <span className="sr-only">search</span>

            <div className="w-5 h-5 absolute inset-y-0 left-5">
              <MagnifyingGlassIcon />
            </div>

            <input
              type="text"
              className="placeholder:text-slate-400 border w-full placeholder:text-sm md:placeholder:text-base border-slate-300 rounded-md py-3 pl-10 pr-3 outline-none focus:outline-none focus:ring focus:border-gray-50 "
              placeholder="Search for Events, Venues"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-y-14   gap-x-8  w-full mt-8  md:px-14 cursor-pointer">
        {artistsDuplicate.map((data) => (
          <Link key={data.id} href={`/artists/${data._id}`}>
            <SingleArtistCard data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
