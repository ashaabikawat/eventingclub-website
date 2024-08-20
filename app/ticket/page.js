"use client";
import ShortTicket from "@/components/tickets/ShortTicket";
import TicketsSlider from "@/components/tickets/TicketsSlider";
import { settings } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const page = () => {
  const data = [
    {
      id: 1,
      day: "saturday",
      date: "13",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 2,
      day: "sunday",
      date: "14",
      month: "Oct",
      time: "1.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
    {
      id: 3,
      day: "monday",
      date: "15",
      month: "Oct",
      time: "12.00pm",
    },
  ];

  return <TicketsSlider data={data} />;
};

export default page;
