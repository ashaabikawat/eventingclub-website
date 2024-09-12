import React from "react";

const ShortTicket = ({ data }) => {
  return (
    <div>
      <div
        className="border border-gray-500 bg-gray-200 flex items-center justify-start gap-2 flex-col rounded-md p-4 
                      h-auto w-24 md:w-32"
      >
        <p
          className="capitalize relative before:inline-block before:w-10 before:h-[1px] before:bg-gray-400 
                      before:absolute before:-bottom-0 before:left-2 text-xs md:text-sm"
        >
          {data.day}
        </p>
        <p className="capitalize text-xs md:text-sm">{data.month}</p>
        <p className="capitalize text-xs md:text-sm bg-gray-400 h-8 w-8 md:h-10 md:w-10 text-center p-2 rounded-full">
          {data.date}
        </p>
        <p className="capitalize text-xs md:text-sm">{data.time}</p>
      </div>
    </div>
  );
};

export default ShortTicket;
