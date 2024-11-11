import React from "react";
import { benefits } from "@/utils/constants";
const Benefits = () => {
  return (
    <>
      <div className="md:py-10 py-6">
        <div classname="">
          <p className="capitalize md:text-3xl text-2xl text-center font-bold text-gray-800 tracking-wide">
            Our benefits
          </p>
        </div>
        <div className="w-20 h-1 mx-auto bg-blue-600 mt-2"></div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-10 md:gap-6 text-center mt-10">
          {benefits.map((benefit, index) => (
            <div key={index} className=" ">
              <div className=" flex flex-col text-center gap-4 justify-center items-center">
                <div className="bg-gradient-to-br from-blue-900 to-indigo-700 shadow-lg p-4 rounded-full">
                  <div className="text-white ">{benefit.icon}</div>
                </div>
                <p className="font-bold text-xl">{benefit.heading}</p>
                <p>{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Benefits;
