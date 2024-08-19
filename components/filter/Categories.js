import React from "react";

const Categories = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Comedy
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        workshop
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Meetups
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Theatre
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Music
      </div>
    </div>
  );
};

export default Categories;
