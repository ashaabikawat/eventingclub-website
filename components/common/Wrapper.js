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
  const success = pathname !== "/success";
  const failure = pathname !== "/failure";
  const eventDetailPage = pathname.startsWith("/events/");

  const isCheckout = pathname.startsWith("/events/tickets/");
  const userDetails = pathname.startsWith("/userDetails/");
  const termsCondtions = pathname.startsWith("/terms-&-conditions");
  const privacyPolicy = pathname.startsWith("/privacy-policy");
  const navbarBgColor = isCheckout ? "bg-gray-50" : "bg-white";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex flex-col min-h-screen">
          {/* Navbar only shows if not on signup, success, or failure pages */}
          {signup && success && failure && <Navbar bgColor={navbarBgColor} />}

          {/* Main content area */}
          <main
            className={`${
              isCheckout || userDetails || termsCondtions || privacyPolicy
                ? "bg-gray-50"
                : "bg-white"
            } flex-grow`}
          >
            {children}
          </main>

          {/* Footer always at the bottom */}
          {signup && !isCheckout && !eventDetailPage && <Footer />}
        </div>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
