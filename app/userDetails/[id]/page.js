"use client";
import EditProfile from "@/components/edit profile/EditProfile";
import Tickets from "@/components/tickets/Tickets";
import { setCustExists, setCustId, setToken } from "@/store/slices/authSlice";
import { getCustomerById } from "@/utils/config";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const [isProfile, setIsProfile] = useState(true);
  const router = useRouter();
  const dispath = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const body = useMemo(() => {
    return { customer_id: id };
  }, [id]);
  const fetchData = async () => {
    const response = await fetch(getCustomerById, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    dispath(setCustId(null));
    dispath(setCustExists(null));
    dispath(setToken(null));
    router.push("/signup");
  };

  return (
    <>
      <div className="mt-4 text-white w-full bg-gray-100">
        <div
          className="flex justify-center md:gap-80 gap-4  p-8 md:p-14 items-center "
          style={{ backgroundColor: "#2f3e93" }}
        >
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
              <p className="md:text-3xl text-xl font-bold mb-4">
                {data ? data.CustomerName : ""}
              </p>
              <p className="md:text-base">{data ? data.Email : " "}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="whitespace-nowrap  inline-flex items-center justify-center px-2   py-2 border border-white-500 rounded-md bg-transparent shadow-sm md:text-base text-sm font-medium text-white "
          >
            Sign out
          </button>
        </div>

        <div className="text-sm font-medium px-4  mb-4 mt-2  text-gray-500  md:px-8 lg:px-64 dark:text-gray-400 dark:border-gray-700">
          <div className=" w-full flex  justify-start  ">
            <ul className=" flex-wrap   flex  md:gap-8 gap-2  items-center -mb-px">
              <li
                onClick={() => setIsProfile(true)}
                className={`inline-block py-4 border-b-2 cursor-pointer border-transparent md:text-xl rounded-t-lg  ${
                  isProfile
                    ? "border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500 text-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                Edit profile
              </li>
              <li
                onClick={() => setIsProfile(false)}
                className={` inline-block py-4 border-transparent cursor-pointer border-b-2 md:text-xl ${
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
            {isProfile ? (
              <EditProfile id={id} data={data} fetchData={fetchData} />
            ) : (
              <Tickets />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
