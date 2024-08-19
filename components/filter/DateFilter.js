import React from "react";

const DateFilter = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Today
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Tomorrow
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        This Weekend
      </div>
    </div>
  );
};

export default DateFilter;
