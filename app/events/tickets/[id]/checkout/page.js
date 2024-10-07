"use client";
import Checkout from "@/components/checkout/Checkout";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  return (
    <div className="bg-gray-50">
      <Checkout />
    </div>
  );
};

export default page;
