import React from "react";

const Tickets = () => {
  return (
    <div className="text-black  bg-gray-100">
      <h1 className="mb-4 text-lg font-semibold">Upcoming events:</h1>
      <div className="bg-white rounded-lg p-4 mb-4 relative border-gray-400 border before:h-8 before:w-8 before:inline-block before:border-r-2 before:border-gray-400  before:rounded-r-full before:absolute before:-left-5 before:bg-gray-100 before:z-100 before:top-16 after:h-8 after:w-8 after:inline-block after:border-l-2 after:border-gray-400  after:rounded-l-full after:absolute after:-right-5 after:bg-gray-100 after:z-100 after:top-16  ">
        <div className="flex justify-between items-start border-b-2 border-gray-200 pb-2">
          <div>
            <p className="font-bold text-lg">#1234</p>
            <div className="flex gap-4 text-sm text-gray-600 mt-2">
              <span>General</span>
              <span className="relative before:w-1 before:h-1 before:bg-black before:inline-block before:rounded-full before:absolute before:-left-2 before:top-2">
                1 Ticket
              </span>
            </div>
          </div>
          <div className="border border-gray-400 rounded-md px-3 py-1 text-sm font-semibold flex items-center">
            ₹ 767
          </div>
        </div>
        <div className="pt-4 ">
          <p className="text-blue-600 font-semibold text-md">
            Sunburn Arena Ft. Alan Walker
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <span>March 13</span>
            <span className="relative before:w-1 before:h-1 before:bg-black before:inline-block before:rounded-full before:absolute before:-left-2 before:top-2">
              12.00 PM
            </span>
            <span className="relative before:w-1 before:h-1 before:bg-black before:inline-block before:rounded-full before:absolute before:-left-2 before:top-2">
              The Habitat : Mumbai
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
