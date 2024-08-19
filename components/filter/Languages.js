import React from "react";

const Languages = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        English
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Marathi
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Hindi
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Hinglish
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Bhojpuri
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Telugu
      </div>
    </div>
  );
};

export default Languages;
