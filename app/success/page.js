"use client";
import {
  reset_state,
  setPromcodeDiscountAmount,
  setConvenienceFee,
} from "@/store/slices/booking";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const Page = () => {
  const search = useSearchParams();

  const router = useRouter();

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const Booking_id = search.get("Booking_id");
  const amount = search.get("amount");
  const paymentmode = search.get("paymentmode");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset_state());
    dispatch(setPromcodeDiscountAmount(null));
    dispatch(setConvenienceFee({}));
  }, []);

  return (
    <div>
      <div className=" mb-10 bebas-neue  ">
        <div className="md:mt-16 mt-6 h-full  flex flex-col items-center justify-center">
          {/* success message */}
          <div className="flex  flex-col items-center justify-center gap-4">
            {/* icon */}
            <div>
              <div className="bg-green-600 rounded-full md:p-3 p-3">
                <FaRegCircleCheck size={52} className="text-white" />
              </div>
            </div>
            {/* heading */}
            <div>
              <div>
                <h1 className="md:text-3xl text-xl text-green-600 font-bold capitalize ">
                  payment successful
                </h1>
              </div>
            </div>
            {/* message */}
            <div className="w-[80%]">
              <div className="md:text-lg text-center  text-gray-600  ">
                <p>
                  Thank you for your payment. Your transaction completed
                  successfully.
                </p>
              </div>
            </div>
          </div>
          {/* payment details */}
          <div className=" w-full flex items-center justify-center md:mt-10  mt-14">
            <div className=" border  lg:w-[60%] w-[90%] rounded-md shadow-xl md:p-6 p-6">
              <h1 className="md:text-2xl text-xl font-semibold md:mb-10 mb-6">
                Payment details
              </h1>
              <div className="flex flex-col md:gap-6 gap-6">
                <div className="flex md:flex-row flex-col gap-1 justify-between">
                  <p className="md:text-xl capitalize text-gray-500">Amount</p>
                  <p className="md:text-xl font-semibold">
                    ₹ {formatAmount(Number(amount))}
                  </p>
                </div>
                <div className="flex  md:flex-row flex-col gap-1  justify-between">
                  <p className="md:text-xl  capitalize text-gray-500">
                    Payment method
                  </p>
                  <p className="md:text-xl font-semibold">{paymentmode}</p>
                </div>
                <div className="flex md:flex-row flex-col gap-1  justify-between">
                  <p className="md:text-xl capitalize text-gray-500">
                    transaction id
                  </p>
                  <p className="md:text-xl font-semibold">{Booking_id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:mt-6  mt-8">
            <button
              className="bg-blue-900 hover:bg-blue-800 md:text-lg text-sm text-white md:p-4  px-4 py-3 rounded-md"
              onClick={() => router.push("/")}
            >
              Back to the main page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
