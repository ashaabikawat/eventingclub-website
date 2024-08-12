import { initialLength } from "@/utils/constants";
import React from "react";

const OtpVerify = () => {
  return (
    <div>
      <h1 className="md:text-3xl text-base mb-2 text-white md:text-black">
        We had sent you a
      </h1>
      <h2 className="md:text-3xl text-base md:text-gray-500 text-gray-700">
        OTP to verify your number
      </h2>
      <div className="mt-4 flex md:gap-2  gap-1">
        {initialLength.map((_, index) => (
          <input
            type="text"
            className="md:w-12 md:h-12 w-8 h-8 rounded-md border border-gray-400 text-center outline-none focus:outline-gray-300"
            placeholder="0"
          />
        ))}
      </div>
    </div>
  );
};

export default OtpVerify;
