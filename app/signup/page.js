"use client";

import OtpVerify from "@/components/otp verify/OtpVerify";
import Welcome from "@/components/welcome page/Welcome";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div className=" h-screen  ">
      <div className=" h-full w-full md:grid md:grid-cols-2  relative flex justify-center items-center">
        <div className=" relative w-full h-full">
          <Image src={"/pic.jpg"} alt="image" layout="fill" objectFit="cover" />
        </div>
        <div className=" md:px-6 md:py-52 px-10 m-4 py-10 absolute md:static backdrop-blur-md border border-gray-500 h-890 rounded-md md:rounded-none md:border-none top-20 md:h-full">
          {!otpSent && <Welcome />}
          {otpSent && <OtpVerify />}
          <button
            type="submit"
            onClick={() => setOtpSent(true)}
            className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
            "
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
