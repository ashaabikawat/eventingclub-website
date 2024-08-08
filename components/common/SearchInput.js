import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

const SearchInput = () => {
  return (
    <label className="relative">
      <span className="sr-only">search</span>
      <MagnifyingGlassIcon className="w-5 h-5 absolute inset-y-0 left-5" />
      <input
        type="text"
        className="placeholder:text-slate-400 border w-full border-slate-300 rounded-md py-3 pl-10 pr-3"
        placeholder="Search for Events, Venues"
      />
    </label>
  );
};

export default SearchInput;
