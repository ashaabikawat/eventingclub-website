import React, { useState } from "react";
import { testimonials } from "@/utils/constants";
import Image from "next/image";

const Testimonials = () => {
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  // Toggle animation pause state
  const handleCardClick = () => {
    setIsAnimationPaused((prevState) => !prevState);
  };

  return (
    <div className="h-full w-full overflow-hidden mt-20  md:px-20 px-6">
      <div className="flex flex-col items-center justify-center">
        <p className="capitalize md:text-3xl text-2xl font-bold text-gray-800 tracking-wide">
          Testimonials
        </p>
        <div className="w-20 h-1 bg-blue-600 mt-2"></div>
      </div>

      <div className="overflow-hidden  group py-10">
        <div
          className={`flex w-max ${
            isAnimationPaused ? "" : "animate-infinite-scroll"
          } md:gap-8 gap-6 transition-all duration-500`}
          style={{
            animationPlayState: isAnimationPaused ? "paused" : "running",
          }}
        >
          {/* Duplicated testimonials to create seamless scrolling */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 transition-transform duration-300 ease-in-out hover:scale-105 group flex flex-col gap-4 rounded-lg flex-none md:w-96 w-72 cursor-pointer shadow-lg hover:shadow-2xl"
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              <p className="text-gray-800 md:text-lg ">"{testimonial.text}"</p>
              <p className=" font-semibold   ">{testimonial.name}</p>
              <div className="flex items-center justify-center p-1 bg-blue-600 rounded-full w-14 h-14 shadow-md">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  height={50}
                  width={50}
                  className="rounded-full border-2 border-white"
                />
              </div>

              <p className="text-sm   text-gray-700 ">{testimonial.post}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
