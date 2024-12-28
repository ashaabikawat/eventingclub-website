"use client";
import React, { useEffect, useState } from "react";
import { faqs } from "@/utils/constants";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

const Faq = () => {
  const [open, setOpen] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const handleOpen = (value) => {
    setSelectedId(value);
    setOpen(open === value ? null : value);
  };

  return (
    <div className="h-full w-full  ">
      <div className="h-full w-full  ">
        <div className=" flex flex-col items-center justify-center ">
          {/* text */}
          <div>
            <p className="capitalize md:text-4xl text-3xl font-extrabold text-gray-800 tracking-wider font-poppinss">
              FAQs
            </p>
          </div>
          <div className="w-20 h-1 bg-blue-600 mt-2"></div>

          {/* faqs */}
          <div className="h-full md:w-4/5 w-4/5 flex items-center justify-center  mx-auto mt-6  ">
            <div className="h-full w-full flex  flex-col gap-6 mx-auto md:py-4 py-4 space-y-4 transition-all ease-linear ">
              {faqs.map((faq, index) => (
                <div
                  onClick={() => handleOpen(index)}
                  className="bg-white px-8  rounded-lg  transition duration-200 ease-in-out shadow-md"
                >
                  <Accordion
                    open={open === index}
                    className="py-2 transition-all "
                  >
                    <AccordionHeader
                      className={`text-gray-800 border-none font-poppins  `}
                    >
                      <div className="flex w-full justify-between">
                        <p className="md:text-xl text-lg font-semibold text-gray-900">
                          {faq.question}{" "}
                        </p>
                      </div>
                    </AccordionHeader>

                    <AccordionBody className="p-0 font-Atkinsons">
                      <div className="pb-4">
                        <p className="text-base text-gray-700 mt-2">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionBody>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
