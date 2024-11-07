"use client";
import Image from "next/image";
import React, { useState } from "react";
import { services } from "@/utils/constants";
import { benefits } from "@/utils/constants";
import { CiCircleInfo } from "react-icons/ci";
import Modal from "../../components/common/custom modal/Modal";

const Page = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  console.log(serviceId);

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
          <div className="flex flex-col gap-6 w-full items-center justify-center ">
            <div className="md:w-52 w-full ">
              <p className="capitalize md:text-3xl text-2xl font-bold text-center ">
                Our mission
              </p>
            </div>
            <div>
              <p className="md:text-lg text-center md:text-left">
                Eventing Club is dedicated to revolutionizing the event
                management industry by providing innovative solutions that
                simplify the process of organizing and attending events,
                ensuring memorable experiences for all involved.
              </p>
            </div>
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
            <p className="capitalize md:text-3xl text-2xl text-center font-bold">
              Our services
            </p>
          </div>
          <div className=" grid lg:grid-cols-3 rounded-md md:grid-cols-2 gap-6 md:gap-10 mt-10  ">
            {services.map((service, index) => (
              <div
                onClick={() => {
                  setIsServiceModalOpen(true);
                  setServiceId(service.id);
                }}
                key={index}
                className="bg-blue-900 text-white rounded-md hover:shadow-custom transition-all duration-500 hover:rounded-md cursor-pointer transform hover:-translate-y-2"
              >
                <div className="hover:border-none border rounded-md   border-gray-500 h-52 flex flex-col items-center justify-center gap-6">
                  <div>{service.icon}</div>
                  <p className="text-center md:text-lg">{service.heading}</p>
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
            <p className="capitalize md:text-3xl text-2xl text-center font-bold">
              Our benefits
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-10 md:gap-6 text-center mt-10">
            {benefits.map((benefit, index) => (
              <div key={index} className=" ">
                <div className=" flex flex-col text-center gap-4 justify-center items-center">
                  <div className="bg-blue-gray-500 shadow-lg p-4 rounded-full">
                    <div className="text-white ">{benefit.icon}</div>
                  </div>
                  <p className="font-bold text-xl">{benefit.heading}</p>
                  <p>{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* cta btn */}
        <div className="mb-12 flex items-center justify-center">
          <div
            className=" py-10 px-6 flex justify-between  items-center w-5/5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
            }}
          >
            <p className="font-bold text-xl  w-[80%]">
              Join Eventing Club today and experience the difference in event
              management and ticketing.
            </p>
            <button className="bg-blue-900 hover:bg-blue-800 md:text-lg text-sm text-white md:py-2 md:px-6 px-4 py-3 rounded-md">
              Join now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
