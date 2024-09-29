"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "../footer/Footer";

const Wrapper = ({ children }) => {
  const pathname = usePathname();
  const signup = pathname !== "/signup";

  const isCheckout = pathname.startsWith("/events/tickets/");
  const navbarBgColor = isCheckout ? "bg-gray-50" : "bg-white";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {signup && <Navbar bgColor={navbarBgColor} />}
        <main>{children}</main>
        <Footer />
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
