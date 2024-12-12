"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { termsconditions } from "../../utils/constants";

const page = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="md:py-8 md:px-6 px-4 py-6">
      <h1 className="font-poppins md:text-2xl text-xl font-bold">
        Terms and Conditions for Eventing Club
      </h1>
      <p className="font-nunito md:text-base text-sm leading-relaxed mt-4">
        Welcome to Eventing Club! These Terms and Conditions ("Terms") govern
        your use of our website, mobile application, and services (collectively,
        "Services"). By accessing or using our Services, you agree to these
        Terms. If you do not agree, please do not use our Services.
      </p>
      <div className="flex flex-col gap-1 md:mt-6 mt-6">
        {termsconditions.map((condition, index) => (
          <div className="py-2 ">
            <Accordion
              onClick={() => handleOpen(index)}
              open={open === index}
              className="px-4 border border-gray-400 rounded-md  bg-white"
            >
              <AccordionHeader className="border-none  text-black text-base font-nunito">
                {condition.title}
              </AccordionHeader>
              <AccordionBody className="border-t-[1px] border-gray-400 font-nunito text-sm md:text-base text-gray-800 font-semibold">
                {condition.description}{" "}
              </AccordionBody>
            </Accordion>
          </div>
        ))}

        <div className="py-2 ">
          <Accordion
            onClick={() => handleOpen(13)}
            open={open === 13}
            className="px-4 border border-gray-400 rounded-md  bg-white"
          >
            <AccordionHeader className="border-none  text-black text-base font-nunito">
              Ticket Purchases and Refunds
            </AccordionHeader>
            <AccordionBody className="border-t-[1px] border-gray-400 font-nunito text-sm md:text-base text-gray-800 font-semibold">
              <ul>
                <li className="font-bold">Purchases</li>
                <ul className="list-disc list-inside mt-2 flex flex-col gap-2 md:gap-1">
                  <li>
                    {" "}
                    All ticket purchases are subject to availability and event
                    organizer terms.
                  </li>
                  <li>
                    Prices include applicable taxes and fees unless otherwise
                    stated.
                  </li>
                  <li>
                    Additional convenience fees may apply and are non-refundable
                  </li>
                </ul>
                <li className="font-bold md:mt-4 mt-6">
                  Refunds and Cancellations
                </li>
                <ul className="list-disc list-inside mt-2 flex flex-col md:gap-1 gap-2">
                  <li>
                    Refunds are processed as per the event organizer’s refund
                    policy.
                  </li>
                  <li>
                    Eventing Club is not liable for event cancellations,
                    postponements, or venue changes. In such cases, you should
                    contact the event organizer for assistance.
                  </li>
                  <li>
                    Refunds for eligible cancellations will be processed within
                    7-10 working days. Convenience fees are non-refundable.
                  </li>
                </ul>
              </ul>
            </AccordionBody>
          </Accordion>
        </div>

        <div className="py-2 ">
          <Accordion
            onClick={() => handleOpen(14)}
            open={open === 14}
            className="px-4 border border-gray-400 rounded-md  bg-white"
          >
            <AccordionHeader className="border-none  text-black text-base font-nunito">
              User Conduct
            </AccordionHeader>
            <AccordionBody className="border-t-[1px] border-gray-400 font-nunito text-sm md:text-base text-gray-800 font-semibold">
              <p className="font-bold text-base">You agree not to:</p>
              <ul className="list-disc list-inside mt-2 flex flex-col md:gap-1 gap-2">
                <li>Use the Services for unlawful or unauthorized purposes.</li>
                <li>
                  Disrupt or interfere with the security or functionality of the
                  Services.
                </li>
                <li>
                  Post or transmit any harmful, offensive, or infringing
                  content.
                </li>
                <li>
                  Use bots or automated systems to purchase tickets or bypass
                  ticket limits.
                </li>
              </ul>
              <p className="font-bold text-base mt-4">
                We reserve the right to suspend or terminate your account for
                violations of these Terms.
              </p>
            </AccordionBody>
          </Accordion>
        </div>

        <div className="py-2 ">
          <Accordion
            onClick={() => handleOpen(15)}
            open={open === 15}
            className="px-4 border border-gray-400 rounded-md  bg-white"
          >
            <AccordionHeader className="border-none  text-black text-base font-nunito">
              Liability Disclaimer
            </AccordionHeader>
            <AccordionBody className="border-t-[1px] border-gray-400 font-nunito text-sm md:text-base text-gray-800 font-semibold">
              <p className="font-bold text-base">
                Eventing Club provides Services "as is" and makes no warranties,
                express or implied. We are not liable for:
              </p>
              <ul className="list-disc list-inside mt-2 flex flex-col md:gap-1 gap-2">
                <li>Event cancellations, postponements, or venue changes.</li>
                <li>
                  Losses arising from unauthorized access to your account.
                </li>
                <li>
                  Damages caused by third-party services linked to our platform.
                </li>
                <li>
                  Circumstances beyond our control, including natural disasters,
                  strikes, or other force majeure events.
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
        </div>

        <div className="py-2 ">
          <Accordion
            onClick={() => handleOpen(16)}
            open={open === 16}
            className="px-4 border border-gray-400 rounded-md  bg-white"
          >
            <AccordionHeader className="border-none  text-black text-base font-nunito">
              Contact Us
            </AccordionHeader>
            <AccordionBody className="border-t-[1px] border-gray-400 font-nunito text-sm md:text-base text-gray-800 font-semibold">
              <p className="font-bold text-base">
                If you have any questions or concerns about these Terms, please
                contact us at:
              </p>
              <div className="mt-2 flex flex-col md:gap-1 gap-2">
                <p>
                  Email:
                  <a href="mailto:support@eventingclub.in">
                    support@eventingclub.in
                  </a>
                </p>
                <p>
                  Phone: <a href="tel:+919730589111">+91 - 9730589111</a>
                </p>
                <p>
                  Address:{" "}
                  <span>
                    Eventing Club, 334/4, Neelkamal Building, Nazarana Compound,
                    Bhiwandi, Maharashtra 421308
                  </span>
                </p>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
      <p className="font-nunito text-xl leading-relaxed mt-6">
        Thank you for choosing Eventing Club. We hope you enjoy our Services!
      </p>
    </div>
  );
};

export default page;
