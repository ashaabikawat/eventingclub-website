import React from "react";
import SearchInput from "../SearchInput";

const PageHeader = ({ text }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between  gap-4">
      <h1 className=" font-bold text-sm md:text-3xl">{text}</h1>
      <div className="md:w-96">
        <SearchInput />
      </div>
    </div>
  );
};

export default PageHeader;
