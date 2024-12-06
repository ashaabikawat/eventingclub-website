import React from "react";

const ShortTicket = ({ data, selectedShortTicket }) => {
  return (
    <div className="nunito">
      <div
        className="border border-gray-500 bg-white flex items-center justify-start gap-2 flex-col rounded-md p-2
                      h-36 md:h-40 w-24 md:w-28"
      >
        <p
          className="capitalize relative before:inline-block before:w-10 font-semibold before:h-[1px] before:bg-blue-900  py-1
                      before:absolute before:-bottom-0 before:left-1/2 before:-translate-x-1/2 text-xs md:text-sm"
        >
          {data.Day}
        </p>
        <p className="capitalize text-xs md:text-sm">{data.Month}</p>
        <p
          className={`capitalize text-white text-xs md:text-sm  h-8 w-8 md:h-10 md:w-10 text-center p-2 rounded-full  ${
            data.eventDateTime_id === selectedShortTicket
              ? "bg-blue-900"
              : "bg-gray-400"
          }`}
        >
          {data.Date}
        </p>
        <p className="capitalize text-xs md:text-sm">{data.Time}</p>
      </div>
    </div>
  );
};

export default ShortTicket;
