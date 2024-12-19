import Image from "next/image";
import React from "react";
import { FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { RiMailLine } from "react-icons/ri";

const page = () => {
  return (
    <div className="min-h-[500px] font-poppins md:py-6 md:mx-20">
      <div className="h-full grid grid-cols-2 md:gap-x-20">
        {/* text */}
        <div className="  h-full md:p-6 md:ml-14">
          <div className="md:mt-6 ">
            <p className=" md:mb-4">How can we help you?</p>
            <h1 className="font-semibold md:text-4xl font-poppins md:mb-8">
              Contact us
            </h1>
            <div className="">
              <p>
                We’re here to help and answer any questions you might have. We
                look forward to hearing from you!
              </p>
              <div className="flex gap-6 w-full items-center  md:mt-6">
                <span>
                  <FiMapPin />
                </span>
                <p>
                  334/4, Neelkamal Building, Nazarana Compound, Bhiwandi,
                  Maharashtra 421308
                </p>
              </div>

              <div className="flex gap-6 w-full items-center md:mt-3">
                <span>
                  <LuPhone />
                </span>
                <p>
                  <a href="tel:+919730589111" className="font-normal">
                    +91 - 9730589111
                  </a>
                </p>
              </div>

              <div className="flex gap-6 w-full items-center md:mt-3">
                <span>
                  <RiMailLine />
                </span>
                <p>
                  <a
                    href="mailto:hello@eventingclub.in"
                    className="font-normal"
                  >
                    hello@eventingclub.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* image */}
        <div className="">
          <Image
            src={"/rb_540.png"}
            // layout="fill"
            width={400}
            height={400}
            alt="profile-picture"
            objectFit="content"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
