"use client";
import PageCard from "@/components/card/PageCard";
import { categories } from "@/utils/config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const [category, setCategory] = useState([]);
  const [categoriesDuplicate, setCategoriesDuplicate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categories.GET_ALL);
      setCategory(response.data.data);
      setCategoriesDuplicate(response.data.data);
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

        const response = await axios.post(categories.SEARCH_KEYWORD, payload);
        setCategoriesDuplicate(response.data.data);
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
      setCategoriesDuplicate(category);
    }
  }, [debounced]);

  return (
    <div className="px-10 py-10 md:p-14">
      <Toaster />
      <div className="flex flex-col md:flex-row justify-between  gap-4">
        <h1 className=" font-bold md:text-2xl ">
          Explore Events By Categories
        </h1>
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 w-full mt-8  cursor-pointer">
        {categoriesDuplicate.map((data) => (
          <Link key={data.id} href={`/categories/${data._id}`}>
            <PageCard key={data.id} data={data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
