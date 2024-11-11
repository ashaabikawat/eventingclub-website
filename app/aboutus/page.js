"use client";
import Image from "next/image";
import React, { useState } from "react";
import { services } from "@/utils/constants";
import { CiCircleInfo } from "react-icons/ci";
import Modal from "../../components/common/custom modal/Modal";
import Benefits from "../../components/benefits/Benefits";
import Cta from "../../components/cta-btn/Cta";

const Page = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  return (
    <div className=" h-full w-full py-8 md:px-20 px-6 ">
      {isServiceModalOpen && (
        <Modal
          serviceId={serviceId}
          setIsServiceModalOpen={setIsServiceModalOpen}
          setServiceId={setServiceId}
        />
      )}
      <div className=" h-full w-full">
        {/* our mission */}
        <div className="flex  items-center md:flex-row flex-col md:gap-10 gap-2 mb-12">
          {/* text */}
          <div className="flex flex-col items-center md:gap-10 gap-2 ">
            {/* Text Section */}
            <div className="flex flex-col gap-6 w-full items-center justify-center text-center">
              <div className="md:w-52 w-full">
                <p className="capitalize md:text-3xl text-2xl font-bold text-gray-800 tracking-wide">
                  Our Mission
                </p>
                {/* Underline Element */}
                <div className="w-20 h-1 mx-auto bg-blue-600 mt-2"></div>
              </div>
              <div>
                <p className="md:text-lg text-gray-700 leading-relaxed">
                  Eventing Club is dedicated to revolutionizing the event
                  management industry by providing innovative solutions that
                  simplify the process of organizing and attending events,
                  ensuring memorable experiences for all involved.
                </p>
              </div>
            </div>

            {/* Image Section */}
            {/* <div className="h-52 md:w-72 w-60 relative">
              <Image
                src="/clipart1162533.png"
                layout="fill"
                className="absolute object-cover rounded-lg shadow-lg"
                alt="Mission Image"
              />
            </div> */}
          </div>

          {/* image */}
          {/* <div className="h-52 md:w-72 w-60  relative">
            {/* <Image src={"/clipart1162533.png"} height={345} width={407} /> */}
          {/* <Image
            src={"/clipart1162533.png"}
            layout="fill"
            className="absolute"
          /> */}
          {/* </div>  */}
        </div>

        {/* our services */}
        <div className="mb-12">
          <div classname="">
            <p className="capitalize md:text-3xl text-2xl text-center font-bold text-gray-800 tracking-wide">
              Our services
            </p>
          </div>
          <div className="w-20 h-1 mx-auto bg-blue-600 mt-2"></div>
          <div className=" grid lg:grid-cols-3 rounded-md md:grid-cols-2 gap-6 md:gap-10 mt-10  ">
            {services.map((service, index) => (
              <div
                onClick={() => {
                  setIsServiceModalOpen(true);
                  setServiceId(service.id);
                }}
                key={index}
                className="bg-gradient-to-br from-blue-900 to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                // className="bg-blue-900 text-white rounded-md hover:shadow-custom transition-all duration-500 hover:rounded-md cursor-pointer transform hover:-translate-y-2"
              >
                <div className="hover:border-none border rounded-md   border-gray-500 h-52 flex flex-col items-center justify-center gap-6">
                  <div>{service.icon}</div>
                  <p className="text-center md:text-lg font-semibold">
                    {service.heading}
                  </p>
                  <div>
                    <CiCircleInfo
                      size={30}
                      onClick={() => {
                        setIsServiceModalOpen(true);
                        setServiceId(service.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* our benefits */}
        <div className="mb-12">
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
        {/* <div className="mb-12">
          <Benefits />
        </div> */}

        {/* cta btn */}
        <div className="mb-12">
          {/* <div className=" flex items-center justify-center">
            <div
              className=" py-10 px-6 flex md:flex-row gap-4 md:gap-0 flex-col justify-between  items-center w-5/5"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
              }}
            >
              <p className="font-bold md:text-xl  md:w-[80%] w-full">
                Join Eventing Club today and experience the difference in event
                management and ticketing.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-md transition hover:from-blue-700 hover:to-indigo-700">
                Join now
              </button>
            </div>
          </div> */}
          <Cta />
        </div>
      </div>
    </div>
  );
};

export default Page;
