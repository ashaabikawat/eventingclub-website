"use client";
import React, { useState, useEffect } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { homepageSearch } from "../../utils/config";
import { MdEventAvailable } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { decryptData } from "@/utils/constants";

const Navbar = ({ bgColor }) => {
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const [open, setOpen] = useState(false);

  const [searchTerm, setsearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const pathname = usePathname();
  const homePageUrl = pathname === "/";

  // Use Redux to check if the user is logged in
  const auth = useSelector((store) => store.uSess);

  // Updated: Getting token from Redux store
  const getToken = decryptData(auth?.pT5, passphrase);

  const cust_id = decryptData(auth?.xA1, passphrase);
  const isLoggedIn = !!getToken; // Check if the user is logged in based on token availability

  // Add/Remove class to block scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 700);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  };

  useEffect(() => {
    toast.dismiss();
    const fetchData = async () => {
      try {
        if (debouncedSearch) {
          if (debouncedSearch.length < 3) {
            toast.error("Search term must be greater than 3 characters");
            return;
          }
        }

        const payload = {
          search_keyword: debouncedSearch,
        };

        const response = await axios.post(
          `${homepageSearch.SEARCH_EVENTS_VENUES}`,
          payload
        );

        if (response.data.data.length > 0) {
          setSearchData(response.data.data);
        } else {
          toast.error("Events or venues not found");
          setSearchData([]);
        }
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
            setSearchData([]);
          }
        }
      }
    };
    if (debouncedSearch !== "") {
      fetchData();
    } else {
      setSearchData([]);
    }
  }, [debouncedSearch]);

  return (
    <div className=" font-poppins">
      <Toaster />
      <div
        className={` relative w-full  ${bgColor} pb-1  z-50`}
        // style={{
        //   boxShadow: " rgba(0, 0, 0, 0.08) 0px 4px 12px",
        // }}
      >
        <div className=" px-4 md:px-6">
          <div className="flex justify-between items-center pt-4 space-x-4 ">
            <div className="flex gap-4 justify-between items-center">
              <div>
                <span className="sr-only">Logo</span>
                <Link href="/">
                  <div className="cursor-pointer relative md:h-20 md:w-36 h-14 w-28">
                    <Image
                      src="/EC Logo Black Name.svg"
                      alt="logo"
                      layout="fill"
                      className="absolute"
                      objectFit="contain"
                    ></Image>
                  </div>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center  mt-2 text-lg">
              <ul
                className={`flex justify-center  ${
                  homePageUrl ? "gap-8" : "gap-14"
                }`}
              >
                <li
                  className=" text-black relative transition-all w-min-content
          before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-900 before:transition-all before:duration-500
          hover:before:w-full hover:before:left-0 hover:before:bg-blue-500"
                >
                  <Link href="/" className="">
                    Home
                  </Link>
                </li>
                <li
                  className=" text-black relative transition-all w-min-content
          before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-900 before:transition-all before:duration-500
          hover:before:w-full hover:before:left-0 hover:before:bg-blue-500 "
                >
                  <Link href="/venue">Venue</Link>
                </li>
                <li
                  className=" text-black relative transition-all w-min-content
          before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-900 before:transition-all before:duration-500
          hover:before:w-full hover:before:left-0 hover:before:bg-blue-500 "
                >
                  <Link href="/artists ">Artist</Link>
                </li>
                <li
                  className=" text-black relative transition-all w-min-content
          before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-900 before:transition-all before:duration-500
          hover:before:w-full hover:before:left-0 hover:before:bg-blue-500 "
                >
                  <Link href="/aboutus ">About us</Link>
                </li>
                <li
                  className=" text-black relative transition-all w-min-content
          before:w-0 before:h-1 before:absolute before:bottom-0 before:right-0 before:bg-blue-900 before:transition-all before:duration-500
          hover:before:w-full hover:before:left-0 hover:before:bg-blue-500"
                >
                  <Link href="/list-with-us">List with us</Link>
                </li>
              </ul>
            </div>

            {/* <div>
              {homePageUrl && (
                <div className="hidden lg:block md:w-72 relative">
                  <label className="relative">
                    <span className="sr-only">search</span>

                    <div className="w-5 h-5 absolute inset-y-0 left-3 ">
                      <MagnifyingGlassIcon className="text-gray-400" />
                    </div>

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleChange}
                      className="placeholder:text-slate-400 border w-full md:placeholder:text-base border-gray-300 rounded-md py-2 pl-10 pr-3 outline-none focus:outline-none focus:ring focus:border-gray-50"
                      placeholder="Search for Events, Venues"
                    />
                  </label>

                  {searchData.length > 0 && (
                    <div
                      className={`bg-white shadow-2xl mt-2 rounded-md z-50 absolute top-full left-0 w-full ${
                        searchData.length > 5
                          ? "max-h-52 overflow-y-scroll"
                          : "h-auto"
                      }`}
                    >
                      {searchData.map((data, index) => (
                        <div key={data._id}>
                          <div className="">
                            {data.Name && (
                              <div className="w-full">
                                <Link
                                  href={`/venue/${data._id}`}
                                  key={data._id}
                                >
                                  <div
                                    className={`p-4 flex items-center space-x-2 w-full  hover:bg-gray-200  ${
                                      index === searchData.length - 1
                                        ? " border-none"
                                        : "border-b-[1px] border-gray-200 "
                                    }`}
                                  >
                                    <LuMapPin
                                      className="text-gray-500"
                                      size={20}
                                    />
                                    <p className="cursor-pointer">
                                      {data.Name}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            )}
                          </div>
                          <div className="">
                            {data.EventName && (
                              <div className="w-full" key={data._id}>
                                <Link
                                  href={`/events/${data._id}`}
                                  key={data._id}
                                >
                                  <div
                                    className={`p-4 flex items-center space-x-2 w-full  hover:bg-gray-200  ${
                                      index === searchData.length - 1
                                        ? " border-none hover:rounded-b-md "
                                        : "border-b-[1px] border-gray-200 "
                                    }`}
                                  >
                                    <MdEventAvailable
                                      className="text-gray-500"
                                      size={20}
                                    />
                                    <p className=" cursor-pointer ">
                                      {data.EventName}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div> */}

            <div className="flex">
              {isLoggedIn ? (
                <div className="flex justify-center items-center">
                  <Link href={`/userDetails/${cust_id}`}>
                    <FaUserCircle className="size-8 md:size-10 text-gray-700 cursor-pointer" />
                  </Link>
                </div>
              ) : (
                <Link href="/signup">
                  <button className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-800">
                    Sign up
                  </button>
                </Link>
              )}
              {/* <button
                type="button"
                className="md:hidden md:ml-6 ml-4"
                onClick={handleToggle}
              >
                <span className="sr-only">open menu</span>
                <Bars3Icon className="w-6 h-6 cursor-pointer" />
              </button> */}
            </div>
          </div>

          {homePageUrl && (
            <div className=" lg:w-2/4 mt-6 md:mt-2 md:mb-2 mb-4">
              <label className="relative w-full">
                <span className="sr-only">search</span>
                <MagnifyingGlassIcon className="w-5 h-5 absolute inset-y-0 left-6 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  className="placeholder:text-gray-400 placeholder:text-sm md:text-base  border w-full border-gray-400 rounded-md py-2 md:py-3 pl-12 pr-3"
                  placeholder="Search for Events, Venues"
                />
              </label>

              {searchData.length > 0 && (
                <div
                  className={`bg-white shadow-2xl mt-2 rounded-md z-50 absolute top-full left-0 w-full ${
                    searchData.length > 5
                      ? "max-h-52 overflow-y-scroll"
                      : "h-auto"
                  }`}
                >
                  {searchData.map((data, index) => (
                    <div key={data._id}>
                      <div className="">
                        {data.Name && (
                          <div className="w-full">
                            <Link href={`/venue/${data._id}`} key={data._id}>
                              <div
                                className={`p-4  flex items-center space-x-2 w-full  hover:bg-gray-200  ${
                                  index === searchData.length - 1
                                    ? " border-none"
                                    : "border-b-[1px] border-gray-200 "
                                }`}
                              >
                                <LuMapPin className="text-gray-500" size={20} />

                                <p className="cursor-pointer">{data.Name}</p>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="  ">
                        {data.EventName && (
                          <div className="w-full">
                            <Link href={`/events/${data._id}`} key={data._id}>
                              <div
                                className={`p-4 flex items-center space-x-2 w-full  hover:bg-gray-200  ${
                                  index === searchData.length - 1
                                    ? " border-none hover:rounded-b-md"
                                    : "border-b-[1px] border-gray-200 "
                                }`}
                              >
                                <MdEventAvailable
                                  className="text-gray-500"
                                  size={20}
                                />
                                <p className=" cursor-pointer ">
                                  {data.EventName}
                                </p>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* <div className="hidden md:flex justify-start gap-20 mt-2 text-lg">
            <ul className="flex justify-start gap-16">
              <li className=" text-black">
                <Link href="/">Home</Link>
              </li>
              <li className=" text-black">
                <Link href="/venue">Venue</Link>
              </li>
              <li className=" text-black">
                <Link href="/artists">Artist</Link>
              </li>
              <li className=" text-black">
                <Link href="/aboutus">About us</Link>
              </li>
              <li className=" text-black">
                <Link href="/list-with-us">List with us</Link>
              </li>
            </ul>
          </div> */}
        </div>
        {/* <div
          className={
            open
              ? "opacity-100 scale-100 bg-white transition-transform duration-700 translate-x-0 ease-in-out absolute top-0 inset-x-0  transform md:hidden h-screen w-screen z-50 overflow-hidden"
              : "opacity-0 scale-95 fixed top-0 inset-x-0   transition transform duration-700 origin-top-left md:hidden -translate-x-full h-screen w-screen z-50 overflow-hidden"
          }
        >
          <div className="ring-black ring-1 ring-opacity-5 w-screen h-full">
            <div className="pt-5 pb-6 px-5">
              <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 h-full">
                <div>
                  <div>
                    <span className="sr-only">Logo</span>
                    <Link href="/">
                      <div className="cursor-pointer relative md:h-20 md:w-52 h-14 w-32">
                        <Image
                          src="/TicketEventingClubLogo.png"
                          alt="logo"
                          layout="fill"
                          className="absolute"
                          objectFit="contain"
                        ></Image>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="mr-2">
                  <button type="button">
                    <XMarkIcon className="w-6 h-6" onClick={handleToggle} />
                  </button>
                </div>
              </div>
              <div className="mt-16">
                <nav>
                  <ul className="flex justify-center items-center flex-col gap-6 text-xl">
                    <li>
                      <Link href="/" onClick={handleToggle}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/venue" onClick={handleToggle}>
                        Venue
                      </Link>
                    </li>
                    <li>
                      <Link href="/artists" onClick={handleToggle}>
                        Artist
                      </Link>
                    </li>
                    <li className=" text-black" onClick={handleToggle}>
                      <Link href="/aboutus">About us</Link>
                    </li>
                    <li className=" text-black" onClick={handleToggle}>
                      <Link href="/list-with-us">List with us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
