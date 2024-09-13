"use client";
import ShortTicket from "@/components/tickets/ShortTicket";
import TicketsSlider from "@/components/tickets/TicketsSlider";
import { events } from "@/utils/config";
import { settings } from "@/utils/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

const page = () => {
  const { id } = useParams();
  const [ticketDate, setTicketDate] = useState();

  useEffect(() => {
    bookTicket();
  }, []);

  const bookTicket = async () => {
    const payload = {
      event_id: id,
    };
    console.log(payload);
    try {
      const response = await axios.post(`${events.GET_TICKETS_DATA}`, payload);
      console.log(response.data.data);
      setTicketDate(response.data.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          // console.log(error.response);
          setError(true);
          toast.error(data.message);
        }
      }
    }
  };
  // console.log(ticketDate);
  return <TicketsSlider data={ticketDate} />;
};

export default page;
