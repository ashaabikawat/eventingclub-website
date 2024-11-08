import React from "react";
import { testimonials } from "@/utils/constants";
import Image from "next/image";

const Testimonials = () => {
  return (
    <div className="h-full w-full overflow-hidden ">
      <div className="flex flex-col items-center justify-center">
        <p className="capitalize md:text-3xl text-2xl font-bold text-gray-800 tracking-wide">
          Testimonials
        </p>
        <div className="w-20 h-1 bg-blue-600 mt-2"></div>
      </div>

      <div className="overflow-hidden  group py-6">
        <div className="flex w-max animate-infinite-scroll gap-4 ">
          {/* Duplicated testimonials to create seamless scrolling */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="shadow-xl p-4 group   rounded-md flex-none md:w-96 w-72 cursor-pointer "
            >
              <p className="  ">{testimonial.text}</p>
              <p className=" font-semibold  mt-2 ">{testimonial.name}</p>
              <div className="mt-2">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              </div>
              <p className="text-sm    mt-1">{testimonial.post}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
