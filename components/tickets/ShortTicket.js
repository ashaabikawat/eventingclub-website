import React from "react";

const ShortTicket = ({ data }) => {
  return (
    <div>
      <div className="border  border-gray-500  bg-gray-200 w-32  flex items-center justify-start gap-2 flex-col rounded-md h-40 px-2 py-4">
        <p className="capitalize relative before:inline-block  before:w-10 before:h-[1px]  before:bg-gray-400 before:absolute before:-bottom-0 before:left-2 text-sm">
          {data.day}
        </p>
        <p className="capitalize text-sm">{data.month}</p>
        <p className="capitalize text-sm bg-gray-400 h-10 w-10 text-center p-2 rounded-full">
          {data.date}
        </p>
        <p className="capitalize text-sm">{data.time}</p>
      </div>
    </div>
  );
};

export default ShortTicket;
