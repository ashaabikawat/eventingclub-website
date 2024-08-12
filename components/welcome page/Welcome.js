import React from "react";
import SearchInput from "../common/SearchInput";

const Welcome = () => {
  return (
    <>
      <h1 className="md:text-3xl text-base font-bold md:mb-6 mb-4 text-white md:text-black">
        Welcome to eventing club
      </h1>

      <p className="text-base mb-3 text-white md:text-black">Phone number*</p>
      <SearchInput placeholder="+91 " />
    </>
  );
};

export default Welcome;
