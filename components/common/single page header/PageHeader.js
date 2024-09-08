import React from "react";
import SearchInput from "../SearchInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const PageHeader = ({ text }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between  gap-4 md:px-14">
      <h1 className=" font-bold text-lg md:text-3xl">{text}</h1>
      <div className="md:w-96">
        <SearchInput
          placeholder="Search for Events, Venues"
          icon={<MagnifyingGlassIcon />}
        />
      </div>
    </div>
  );
};

export default PageHeader;
