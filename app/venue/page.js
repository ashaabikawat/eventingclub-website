"use client";

import { VenueCard } from "@/components/venue card/VenueCard";

import { venues } from "@/utils/config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [allVenues, setAllVenues] = useState([]);
  const [venuesDuplicate, setVenuesDuplicate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(venues.GET_ALL);
      setAllVenues(response.data.data);
      setVenuesDuplicate(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebounced(searchKeyword);
    }, 700);

    return () => clearTimeout(delay);
  }, [searchKeyword]);

  useEffect(() => {
    toast.dismiss();
    const fetchData = async () => {
      try {
        if (debounced.length < 3) {
          toast.error("Search keyword must be at least 2 characters long.");
          return;
        }
        const payload = {
          search_keyword: debounced,
        };

        const response = await axios.post(venues.SEARCH_KEYWORD, payload);
        setVenuesDuplicate(response.data.data);
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
            toast.error(data.message);
          }
        }
      }
    };
    if (debounced !== "") {
      fetchData();
    } else {
      setVenuesDuplicate(allVenues);
    }
  }, [debounced]);

  return (
    <div className=" px-4 py-10 md:py-10 md:px-6 mb-2 nunito ">
      <Toaster />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="  font-bold text-xl  lg:text-2xl md:text-xl bebas-neue ">
          Pick your venue:
        </h1>
        <div className="md:w-96">
          <label className="relative">
            <span className="sr-only">search</span>

            <div className="w-5 h-5 absolute inset-y-0 left-5">
              <MagnifyingGlassIcon className="text-gray-400" />
            </div>

            <input
              type="text"
              className="placeholder:text-slate-400 border w-full placeholder:text-sm md:placeholder:text-base border-slate-300 rounded-md py-3 pl-10 pr-3 outline-none focus:outline-none focus:ring focus:border-gray-50 "
              placeholder="Search for Venues"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 md:gap-4 w-full mt-6  ">
        {venuesDuplicate.map((data) => (
          <Link href={`/venue/${data._id}`} key={data._id}>
            <VenueCard data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
