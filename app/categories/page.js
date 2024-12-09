"use client";
import PageCard from "@/components/card/PageCard";
import { categories } from "@/utils/config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [category, setCategory] = useState([]);
  const [categoriesDuplicate, setCategoriesDuplicate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    toast.dismiss();
    try {
      const response = await axios.get(categories.GET_ALL);
      setCategory(response.data.data);
      setCategoriesDuplicate(response.data.data);
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

        const response = await axios.post(categories.SEARCH_KEYWORD, payload);
        setCategoriesDuplicate(response.data.data);
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
      setCategoriesDuplicate(category);
    }
  }, [debounced]);

  return (
    <div className=" px-4 py-10 md:py-10 md:px-6 mb-2 bebas-neue">
      <Toaster />
      {/* header */}
      <div className="flex flex-col md:flex-row md:justify-between   md:items-center  gap-4">
        <h1 className=" font-bold  lg:text-2xl md:text-xl text-xl ">
          Explore Events By Categories
        </h1>
        <div className="md:w-96 ">
          <label className="relative">
            <span className="sr-only">search</span>

            <div className="w-5 h-5 absolute inset-y-0 left-5">
              <MagnifyingGlassIcon className="text-gray-400" />
            </div>

            <input
              type="text"
              className="placeholder:text-slate-400 py-2  border w-full placeholder:text-sm md:placeholder:text-base border-slate-300 rounded-md md:py-3 pl-12 pr-3 outline-none focus:outline-none focus:ring focus:border-gray-50 "
              placeholder="Search for Categories"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4 w-full mt-8  cursor-pointer">
        {categoriesDuplicate
          ?.filter((items) => items?.Images[0]?.image_path)
          ?.map((data) => (
            <Link key={data.id} href={`/categories/${data._id}`}>
              <PageCard key={data.id} data={data} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Page;
