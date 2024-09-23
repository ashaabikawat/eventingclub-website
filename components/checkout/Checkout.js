import React, { useEffect, useState } from "react";
import Verification from "./verification";
import BookingSummary from "./BookingSummary";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData } from "@/store/slices/booking";
import { useParams } from "next/navigation";
import InvoiceDetails from "./InvoiceDetails";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { loginSuccess } from "@/store/slices/authSlice";

const Checkout = () => {
  const [open, setOpen] = useState(1); // Control active accordion step
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [details, setDetails] = useState();
  const getToken = JSON.parse(localStorage.getItem("authToken"));
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const isLoggedIn = getToken?.isLoggedIn;
  console.log(isLoggedIn);
  const cust_id = getToken?.cust_id;
  console.log(cust_id);

  const dispatch = useDispatch();

  useEffect(() => {
    // Automatically open the Booking Summary (Step 2) if the user is logged in
    if (isLoggedIn) {
      handleOpen(2); // Open the Booking Summary step
    } else if (details?.Email) {
      // Also open if email is provided in the details (from Verification)
      handleOpen(2);
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   if (open === 2) {
  //     setIsAccordionOpen(true);
  //   } else {
  //     setIsAccordionOpen(false);
  //   }
  // }, [open]);

  return (
    <div className="md:py-6 py-4">
      <div className="px-4 md:px-12">
        <h1 className="capitalize md:text-3xl md:mb-8 font-bold">
          Confirm your ticket details and pay
        </h1>
      </div>

      <div className="md:px-12 md:mt-0 px-4 mt-4">
        <div className="border border-gray-400 rounded-lg md:py-0 py-4 px-4">
          <Accordion open={open === 1}>
            <AccordionHeader className="border-none">
              <div className="flex flex-col gap-2">
                <p className="text-base text-gray-900 font-normal">Step 1</p>
                <div>
                  {" "}
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
              {" "}
              <Verification
                // setIsLoggedIn={setIsLoggedIn}
                setDetails={setDetails}
                handleOpen={handleOpen}
              />
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      <div className="md:px-12 md:mt-6 px-4 mt-4">
        <div className="border border-gray-400 rounded-lg md:py-0 py-4 px-4">
          <Accordion open={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-none"
            >
              <div className="flex flex-col gap-2">
                <p className="text-base text-gray-900 font-normal">Step 2</p>
                <h1 className="font-semibold text-2xl">Booking Summary</h1>
              </div>
            </AccordionHeader>
            <AccordionBody>
              {open === 2 && (
                <BookingSummary
                  cust_id={cust_id}
                  handleOpen={handleOpen}
                  isAccordionOpen={isAccordionOpen}
                  setIsAccordionOpen={setIsAccordionOpen}
                />
              )}
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      <div className="md:px-12 md:mt-6 px-4 mt-4">
        <div className="border border-gray-400 rounded-lg md:py-0 py-4 px-4">
          <Accordion open={open === 3}>
            <AccordionHeader className="border-none">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Step 3</p>
                <h1 className="md:text-2xl text-xl font-bold">
                  Ticket details
                </h1>
                <p className="md:font-semibold md:text-base text-sm ">
                  These details will be shown on your invoice *{" "}
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <InvoiceDetails cust_id={cust_id} />
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
