"use client";
import EditProfile from "@/components/edit profile/EditProfile";
import TicketById from "@/components/tickets/TicketById";
import { logout } from "@/store/slices/authSlice";
import { customer } from "@/utils/config";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Page = () => {
  const [isProfile, setIsProfile] = useState(true);
  const router = useRouter();
  const dispath = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();

  const fetchData = async () => {
    toast.dismiss();
    const payload = { customer_id: id };

    try {
      const response = await axios.post(`${customer.GET_BY_ID}`, payload);

      setData(response.data.data);
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
    fetchData();
  }, []);

  const logoutFunction = () => {
    dispath(logout());
    router.push("/signup");
  };

  return (
    <>
      <Toaster />
      <div className=" text-white w-full h-full flex flex-col justify-center gap-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-center md:px-6 px-4 py-6 bg-blue-900 text-white">
          {/* Profile Section */}
          <div className="flex items-center w-full sm:w-auto gap-6">
            {/* Profile Image */}
            <div className="relative h-24 w-24 md:h-28 md:w-28">
              <Image
                src="/user-icon-2048x2048-ihoxz4vq.png"
                alt="profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-white"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl font-bold capitalize">
                {data ? data.CustomerName : "Loading..."}
              </p>
              <p className="text-sm md:text-base text-gray-300">
                {data ? data.Email : "Loading email..."}
              </p>
              <button
                onClick={logoutFunction}
                className="text-sm md:text-base md:hidden font-medium px-4 py-2 bg-blue-600 hover:bg-red-700 transition rounded-lg shadow"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Additional Sign Out Button */}
          <div className="mt-4 sm:mt-0">
            <button
              onClick={logoutFunction}
              className="hidden sm:inline-block text-sm md:text-base font-medium px-4 py-2 bg-transparent border border-white rounded-lg text-white hover:bg-white hover:text-blue-900 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="text-sm font-medium  px-4  mb-4 mt-2  text-gray-500  md:px-8  dark:text-gray-400 dark:border-gray-700">
          <div className=" w-full flex  justify-start  ">
            <ul className=" flex-wrap   flex  md:gap-8 gap-6  items-center -mb-px">
              <li
                onClick={() => setIsProfile(true)}
                className={`inline-block border-b-2 cursor-pointer border-transparent md:text-2xl text-lg rounded-t-lg  ${
                  isProfile
                    ? "border-blue-600 rounded-t-lg  dark:text-blue-900 dark:border-blue-500 text-blue-900"
                    : "hover:text-black hover:border-blue-600 text-gray-900 dark:hover:text-black"
                }`}
              >
                Edit profile
              </li>
              <li
                onClick={() => setIsProfile(false)}
                className={` inline-block border-transparent cursor-pointer border-b-2 text-lg md:text-2xl ${
                  !isProfile
                    ? "border-blue-600 rounded-t-lg  dark:text-blue-900 dark:border-blue-500 text-blue-900"
                    : "hover:text-black hover:border-blue-600 text-gray-900 dark:hover:text-black"
                }`}
              >
                Tickets
              </li>
            </ul>
          </div>
        </div>

        <div className="px-4 md:px-8  ">
          <div className="h-[100%]">
            {isProfile ? <EditProfile id={id} data={data} /> : <TicketById />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
