import React from "react";
import { dropdownOptions } from "@/utils/constants";

const DatePicker = ({ handleDateSelection }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {dropdownOptions?.map((options) => (
        <div
          key={options.id}
          className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer"
          onClick={() => handleDateSelection(options.Value)}
        >
          {options.Value}
        </div>
      ))}
    </div>
  );
};

export default DatePicker;
