"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import store from "@/store/store";

const Wrapper = ({ children }) => {
  const pathname = usePathname();
  const signup = pathname !== "/signup";
  return (
    <Provider store={store}>
      {signup && <Navbar />}
      <main>{children}</main>
    </Provider>
  );
};

export default Wrapper;
