import React, { useEffect, useState } from "react";
import Verification from "./verification";
import BookingSummary from "./BookingSummary";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { decryptData } from "@/utils/constants";

const Checkout = () => {
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const [open, setOpen] = useState(1); // Control active accordion step
  const [details, setDetails] = useState();
  const auth = useSelector((store) => store.uSess);
  const [otpVerified, setOtpVerified] = useState(false);

  const isLoggedIn = decryptData(auth?.jL3, passphrase);
  console.log(isLoggedIn);
  const cust_id = decryptData(auth?.xA1, passphrase);

  const handleOpen = (value) => {
    if (cust_id) {
      setOpen(open === value ? 0 : value);
    }
  };

  useEffect(() => {
    // Automatically open Booking Summary if user is logged in
    if (isLoggedIn) {
      // Open Booking Summary directly if user is logged in
      setOpen(2);
    } else if (details?.Email && otpVerified) {
      // Open the Booking Summary step if email is present and OTP is verified
      setOpen(2);
    }
  }, [isLoggedIn, otpVerified, details]);

  return (
    <div className="md:py-6 py-4 h-full w-full">
      <div className="px-4 ">
        <h1 className="capitalize md:text-3xl md:mb-8 font-bold font-poppins">
          Confirm your ticket details and pay
        </h1>
      </div>

      {/* verification */}
      <div className=" md:mt-0 px-4 mt-4 ">
        <div className="border border-gray-400 rounded-lg md:py-0 py-4 px-4 bg-white">
          <Accordion open={open === 1} className="p-0">
            <AccordionHeader className="border-none font-nunito">
              <div className="flex flex-col gap-2">
                <p className="text-base text-gray-900 font-normal">Step 1</p>
                <div>
                  {isLoggedIn ? (
                    <div>
                      <p>Logged in as</p>
                      <p className="text-base font-normal mt-2">
                        {details?.Email}
                      </p>
                    </div>
                  ) : (
                    <p>Log in</p>
                  )}
                </div>
              </div>
            </AccordionHeader>

            <AccordionBody>
              <Verification
                details={details}
                setDetails={setDetails}
                handleOpen={handleOpen}
                otpVerified={otpVerified}
                setOtpVerified={setOtpVerified}
              />
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      {/* booking summary */}
      <div className=" md:mt-6 px-4 mt-4">
        <div className="border border-gray-400 rounded-lg md:py-0 py-4 px-4 bg-white">
          <Accordion open={open === 2}>
            <AccordionHeader className="border-none font-poppins">
              <div className="flex flex-col gap-2">
                <p className="text-base text-gray-900 font-normal">Step 2</p>
                <h1 className="font-semibold text-2xl">Booking Summary</h1>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {open === 2 && (
                <BookingSummary cust_id={cust_id} handleOpen={handleOpen} />
              )}
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
