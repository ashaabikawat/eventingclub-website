import React from "react";

const SeasonPass = ({ data, isSeasonpassActive }) => {
  return (
    // <div className="flex gap-4" onClick={handleSeasonPass}>
    //   {data?.DateTimeDate.map((data, index) => (
    //     <div onClick={() => handleShowTicket(data.eventDateTime_id)}>
    //       <div
    //         className="border border-gray-500 bg-gray-200 flex items-center justify-start gap-6 flex-col rounded-md p-4
    //                   h-auto w-24 md:w-32"
    //       >
    //         <p
    //           className="capitalize relative before:inline-block before:w-10 before:h-[1px] before:bg-gray-400
    //                   before:absolute before:-bottom-0 before:left-2 text-xs md:text-sm"
    //         >
    //           Season Pass
    //         </p>
    //         <p className="capitalize text-xs md:text-sm">{`${startsFrom}-${endsTo} ${data.Month}`}</p>
    //         {/* <p className="capitalize text-xs md:text-sm bg-gray-400 h-8 w-8 md:h-10 md:w-10 text-center p-2 rounded-full">
    //           {data.Date}
    //         </p> */}

    //         <p className="capitalize text-xs text-center md:text-sm">
    //           <p className="capitalize text-xs md:text-sm">Starts from</p>

    //           {data.Time}
    //         </p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div
      className={`${
        isSeasonpassActive ? "bg-blue-900 text-white" : " bg-white "
      }  border border-blue-900  flex items-center justify-start gap-5 flex-col rounded-md px-2 py-4
h-36 md:h-40 w-24 md:w-32 font-nunito`}
    >
      <p
        className="capitalize font-semibold text-center relative before:inline-block before:w-12 before:h-[2px] before:bg-blue-800
  before:absolute before:-bottom-1 before:left-1/2 before:translate-x-[-50%] text-xs md:text-sm"
      >
        Season pass
      </p>
      <p className="capitalize text-xs md:text-sm">{`${
        data?.DateTimeDate[0].Date
      }-${data?.DateTimeDate[data.DateTimeDate.length - 1].Date} ${
        data?.DateTimeDate[0].Month
      }`}</p>

      <p className="capitalize text-xs md:text-sm text-center">
        <p className="capitalize text-xs md:text-sm">Start from</p>
        {`${data?.DateTimeDate[0].Time}`}
      </p>
    </div>
  );
};

export default SeasonPass;
