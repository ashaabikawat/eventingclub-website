"use client";
import React, { useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homePageUrl = pathname === "/";
  console.log(homePageUrl);

  // console.log(pathname);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative  w-full">
      <div className="max-w-8xl mx-9  sm:px-4">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex gap-20 justify-between items-center">
            <div>
              <span className="sr-only">Logo</span>
              <span>LOGO</span>
            </div>
            {/* Desktop search bar */}
            {homePageUrl && (
              <div className="hidden md:block lg:w-600px md:w-96">
                <SearchInput />
              </div>
            )}
          </div>
          <div className="flex items-start gap-4">
            <button className="whitespace-nowrap  inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Sign up
            </button>
            <button type="button" className="md:hidden" onClick={handleToggle}>
              <span className="sr-only">open menu</span>
              <Bars3Icon className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
        </div>
        {/* Mobile search bar */}
        {homePageUrl && (
          <div className="mt-3 md:hidden">
            <label className="relative w-full">
              <span className="sr-only">search</span>
              <MagnifyingGlassIcon className="w-5 h-5 absolute inset-y-0 left-5" />
              <input
                type="text"
                className="placeholder:text-slate-400 border w-full border-slate-300 rounded-md py-3 pl-10 pr-3"
                placeholder="Search for Events, Venues"
              />
            </label>
          </div>
        )}
        <div className="hidden md:flex justify-start gap-20 text-xl">
          <ul className="flex justify-start gap-20 text-lg">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/venue">Venue</Link>
            </li>
            <li>
              <Link href="/artists">Artist</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          open
            ? "opacity-100 scale-100 bg-white transition-transform duration-700 translate-x-0 ease-in-out absolute top-0 inset-x-0  transform md:hidden h-screen w-screen z-50 overflow-hidden"
            : "opacity-0 scale-95 fixed top-0 inset-x-0   transition transform duration-700 origin-top-left md:hidden -translate-x-full h-screen w-screen z-50 overflow-hidden"
        }
      >
        <div className="ring-black ring-1 ring-opacity-5 w-screen h-screen">
          <div className="pt-5 pb-6 px-5">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 h-full">
              <div>
                <span className="text-xl">LOGO</span>
              </div>
              <div className="mr-2">
                <button type="button">
                  <XMarkIcon className="w-6 h-6" onClick={handleToggle} />
                </button>
              </div>
            </div>
            <div className="mt-16">
              <nav>
                <ul className="flex justify-center items-center flex-col gap-6 text-2xl">
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
                  <li>
                    <Link href="/blogs" onClick={handleToggle}>
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={handleToggle}>
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;