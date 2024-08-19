import Filter from "@/components/filter/Filter";
import React from "react";

const page = () => {
  return (
    <div className="h-full w-full">
      <div className="w-full h-full grid md:grid-cols-2">
        <div className=" w-full h-full">
          <Filter />
        </div>
        <div className="bg-blue-500 w-full h-full hidden md:block"></div>
      </div>
    </div>
  );
};

export default page;
