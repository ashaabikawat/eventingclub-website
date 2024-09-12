import React from "react";

const SearchInput = ({ placeholder, icon }) => {
  return (
    <label className="relative">
      <span className="sr-only">search</span>
      {icon && <div className="w-5 h-5 absolute inset-y-0 left-5">{icon}</div>}
      <input
        type="text"
        className="placeholder:text-slate-400 border w-full md:placeholder:text-base border-slate-300 rounded-md py-3 pl-10 pr-3 outline-none focus:outline-none focus:ring focus:border-gray-50 "
        placeholder={placeholder}
      />
    </label>
  );
};

export default SearchInput;
