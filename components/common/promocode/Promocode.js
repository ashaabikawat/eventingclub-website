import React, { useState } from "react";

const Promocode = ({ promocode }) => {
  return (
    <div>
      <div className=" border border-gray-300 rounded-md px-2 py-4 md:w-full ">
        <div>
          <div className="  flex gap-4 items-center ">
            <input type="radio" className="w-4 h-4" name="promocode" />
            <label className=" text-blue-900 text-base p-2  rounded-md border border-dashed border-blue-900 font-bold">
              {promocode?.PromoCodeName}
            </label>
          </div>
        </div>
        <div>
          <div className="flex flex-col mt-3 pl-8 ">
            <p className="text-base capitalize  text-blue-900 font-semibold">
              {promocode.PromType === Number(1)
                ? `save ₹ ${promocode?.Value}`
                : `save ${promocode?.Value}%`}
            </p>
            {/* <p className="text-xs text-gray-700">
              HTML symbol, character and entity codes, ASCII, CSS and HEX values
              for Indian Rupee Sign, plus a panoply of others.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promocode;
