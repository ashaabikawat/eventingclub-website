"use client";
import EditProfile from "@/components/edit profile/editProfile";
import Tickets from "@/components/tickets/Tickets";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [isProfile, setIsProfile] = useState(true);

  return (
    <>
      <div
        className="p-8 md:p-14 mt-4 text-white w-screen"
        style={{ backgroundColor: "#2f3e93" }}
      >
        <div className="flex justify-center md:gap-80 gap-4  px-4  items-center">
          <div className="flex justify-between md:gap-8 gap-2  items-center">
            <div className="relative md:h-28 md:w-28 w-16 h-16">
              <Image
                src={"/pic.jpg"}
                alt="profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex items-start justify-center flex-col  ">
              <p className="md:text-3xl text-xl font-bold mb-4">Ashaa</p>
              <p className="md:text-base">asha@gmail.com</p>
            </div>
          </div>
          <button className="whitespace-nowrap  inline-flex items-center justify-center px-2   py-2 border border-white-500 rounded-md bg-transparent shadow-sm md:text-base text-sm font-medium text-white ">
            Sign out
          </button>
        </div>
      </div>
      <div className="text-sm font-medium text-center text-gray-500  dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap justify-center items-center -mb-px">
          <li
            onClick={() => setIsProfile(true)}
            className={`me-2 inline-block p-4 border-b-2 border-transparent md:text-xl rounded-t-lg  ${
              isProfile
                ? "border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500 text-blue-500"
                : "hover:text-gray-600 hover:border-gray-300 text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            Edit profile
          </li>
          <li
            onClick={() => setIsProfile(false)}
            className={`me-2 inline-block p-4  border-b-2 md:text-xl ${
              !isProfile
                ? "border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500 text-blue-500"
                : "hover:text-gray-600 hover:border-gray-300 text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            Tickets
          </li>
        </ul>
      </div>
      <div>{isProfile ? <EditProfile /> : <Tickets />}</div>
    </>
  );
};

export default page;
