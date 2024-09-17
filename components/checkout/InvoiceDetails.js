import React from "react";

const InvoiceDetails = () => {
  return (
    <div className="md:px-12 px-4 mt-4">
      <div className="border border-gray-400 h-auto rounded-lg py-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Step 3</p>
          <h1 className="md:text-2xl text-xl font-bold">Ticket details</h1>
          <p className="md:font-semibold md:text-base text-sm ">
            These details will be shown on your invoice *{" "}
          </p>
        </div>
        <div className=" w-full mt-4 rounded-lg flex justify-between ">
          <form className="w-full">
            <input
              type="text"
              placeholder="Full name*"
              className="border md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600 "
            />
            <input
              type="number"
              placeholder="Phone number*"
              className="border  md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600  mt-4"
            />
            <input
              type="email"
              placeholder="Email`*"
              className="border md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600  mt-4"
            />
            <input
              type="text"
              placeholder="Address"
              className="border md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600  mt-4"
            />
            <div className="flex  gap-4">
              <input
                type="number"
                placeholder="Pincode"
                className="border md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600  mt-4"
              />

              <input
                type="text"
                placeholder="State"
                className="border md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600  mt-4"
              />

              <input
                type="text"
                placeholder="City"
                className="border md:text-base text-sm border-gray-400 px-4 py-2 rounded-lg w-[100%] relative placeholder:text-gray-600 mt-4"
              />
            </div>

            <div className="flex justify-start items-center md:gap-2 gap-4 mt-6">
              <input
                type="checkbox"
                className="md:h-4 md:w-4 w-6 h-6 border border-blue-500"
              />
              <span className="md:text-base text-sm">
                i accept and have read the terms and conditions
              </span>
            </div>

            <button className="w-full text-white py-2 rounded-lg bg-blue-900 mt-4 ">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
