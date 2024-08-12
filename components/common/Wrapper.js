"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

const Wrapper = ({ children }) => {
  const pathname = usePathname();
  const signup = pathname !== "/signup";
  return (
    <div>
      {signup && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Wrapper;
