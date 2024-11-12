import Image from "next/image";
import React from "react";

const HeroForListWithUs = () => {
  return (
    <div className="w-full relative">
      {/* image */}
      <div className="w-full md:h-[600px] h-[400px] relative brightness-50">
        <Image
          src={"/pexels-polina-kovaleva-5827860.jpg"}
          alt="Hero for List with Us"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>
      {/* text */}
      <div className="md:w-[600px] w-full  h-full absolute top-0 left-0 px-6  ">
        <div className="flex h-full flex-col md:gap-8 gap-6 justify-center ">
          {/* headline */}
          <div className="text-center md:text-left">
            <h1 className="text-white text-xl md:text-4xl  font-bold tracking-wide  ">
              Effortless Event Ticketing & Management with Eventing Club
            </h1>
          </div>

          {/* para */}
          <div className="text-center md:text-left">
            <p className="text-white text-sm md:leading-8 font-medium md:text-lg">
              From concerts and exhibitions to college events and club nights,
              Eventing Club helps you connect with your audience while
              simplifying the entire ticketing process.
            </p>
          </div>

          {/* cta */}
          <div className="text-center md:text-left">
            <button className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold py-3 px-6 rounded-md transition hover:from-blue-700 hover:to-indigo-700 ">
              List Your Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroForListWithUs;
