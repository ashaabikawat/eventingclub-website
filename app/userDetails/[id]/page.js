"use client";
import EditProfile from "@/components/edit profile/EditProfile";
import Tickets from "@/components/tickets/Tickets";
import {
  setAuthDetails,
  setCustExists,
  setCustId,
  setToken,
} from "@/store/slices/authSlice";
import { getCustomerById } from "@/utils/config";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [isProfile, setIsProfile] = useState(true);
  const router = useRouter();
  const dispath = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();

  const fetchData = async () => {
    const payload = { customer_id: id };
    // console.log(payload);

    try {
      const response = await axios.post(getCustomerById, payload);
      console.log(response.data);
      setData(response.data.data);
      // toast.success(response.data.message)
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    dispath(setAuthDetails({ cust_id: null, customer_exists: null }));
    dispath(setToken(null));
    router.push("/signup");
  };

  return (
    <>
      <div className="mt-4 text-white w-full bg-gray-100">
        <div
          className="flex justify-between  
          lg:px-60 md:px-6 px-4 items-center py-4  "
          style={{ backgroundColor: "#2f3e93" }}
        >
          <div className="flex  items-center md:gap-4 gap-2">
            <div className="relative md:h-28 md:w-28 w-12 h-12">
              <Image
                src={"/pic.jpg"}
                alt="profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className=" flex flex-col ">
              <p className="md:text-2xl text-sm capitalize font-bold mb-4">
                {data ? data.CustomerName : ""}
              </p>
              <p className="md:text-base text-xs">{data ? data.Email : " "}</p>
            </div>
          </div>
          <div>
            <button
              onClick={logout}
              className="whitespace-nowrap text-sm p-2 inline-flex items-center justify-center  border border-white-500 rounded-md bg-transparent shadow-sm md:text-base md:p-2  md:font-medium text-white "
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="text-sm font-medium px-4  mb-4 mt-2  text-gray-500  md:px-8 lg:px-64 dark:text-gray-400 dark:border-gray-700">
          <div className=" w-full flex  justify-start  ">
            <ul className=" flex-wrap   flex  md:gap-8 gap-6  items-center -mb-px">
              <li
                onClick={() => setIsProfile(true)}
                className={`inline-block py-4 border-b-2 cursor-pointer border-transparent md:text-xl text-lg rounded-t-lg  ${
                  isProfile
                    ? "border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500 text-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                Edit profile
              </li>
              <li
                onClick={() => setIsProfile(false)}
                className={` inline-block py-4 border-transparent cursor-pointer border-b-2 text-lg md:text-xl ${
                  !isProfile
                    ? "border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500 text-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                Tickets
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 md:px-8 lg:px-64 ">
          <div className="">
            {isProfile ? <EditProfile id={id} data={data} /> : <Tickets />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
