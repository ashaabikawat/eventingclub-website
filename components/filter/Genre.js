import React from "react";

const Genre = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Entertainment
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Cook
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Dance
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Adventure
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Festival
      </div>
      <div className="border border-gray-300 p-2 rounded-md text-black cursor-pointer">
        Gaming & Quizzes
      </div>
    </div>
  );
};

export default Genre;
