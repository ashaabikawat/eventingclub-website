"use client";
import React, { useState } from "react";
import { faqs } from "@/utils/constants";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Faq = () => {
  const [open, setOpen] = useState(null);
  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };
  return (
    <div className="h-full w-full bg-gray-200 py-6 md:p-0 ">
      <div className="h-full w-full  ">
        <div className="mt-2 flex flex-col items-center justify-center">
          {/* text */}
          <div>
            <p className="capitalize md:text-3xl text-2xl font-bold text-gray-800 tracking-wide">
              FAQs
            </p>
          </div>
          <div className="w-20 h-1 bg-blue-600 mt-2"></div>

          {/* faqs */}
          <div className="h-full md:w-4/5 w-72 flex items-center justify-center  mx-auto mt-6  ">
            <div className="h-full w-full flex  flex-col gap-4 mx-auto md:py-4">
              {faqs.map((faq, index) => (
                <div
                  onClick={() => handleOpen(index)}
                  className="bg-white  px-6 rounded-xl"
                >
                  <Accordion open={open === index} className="py-2 ">
                    <AccordionHeader className="border-none ">
                      <div>
                        <p className="md:text-lg text-sm text-black">
                          {faq.question}
                        </p>
                      </div>
                    </AccordionHeader>

                    <AccordionBody className="p-0">
                      <div className="pb-4">
                        <p className="md:text-sm text-sm font-semibold text-black">
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
