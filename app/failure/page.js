"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { BsExclamationOctagonFill } from "react-icons/bs";

const Page = () => {
  const search = useSearchParams();
  const router = useRouter();

  const transactionId = search.get("txnid");
  const errorMessage = search.get("error_Message");

  return (
    <div className="bg-red-900">
      <div className="flex items-center justify-center mx-auto w-[90%] min-h-svh">
        <div className=" rounded-md shadow-xl py-6 bg-white md:py-12">
          <div className=" h-full  flex flex-col items-center justify-center">
            {/* success message */}
            <div className="flex  flex-col items-center justify-center gap-4">
              {/* icon */}
              <div>
                <div className=" rounded-full md:p-3 p-3">
                  <BsExclamationOctagonFill
                    size={52}
                    className="text-red-500"
                  />
                </div>
              </div>
              {/* heading */}
              <div>
                <div>
                  <h1 className="md:text-3xl text-xl font-bold capitalize text-red-500">
                    payment failed
                  </h1>
                </div>
              </div>
              {/* message */}
              <div className="w-[80%]">
                <div className="md:text-lg  text-center  text-gray-600  ">
                  <p>{`${transactionId}: ${errorMessage}`}</p>
                </div>
              </div>
            </div>

            <div className="md:mt-6  mt-8">
              <button
                className="bg-blue-900 hover:bg-blue-800 md:text-lg text-sm text-white md:p-4  px-4 py-3 rounded-md"
                // onclick={() => console.log("backed")}
                onClick={() => router.push("/")}
              >
                Back to the main page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
