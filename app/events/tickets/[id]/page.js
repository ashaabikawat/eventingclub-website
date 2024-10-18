"use client";
import Loading from "@/components/common/loading/Loading";
import TicketsSlider from "@/components/tickets/TicketsSlider";
import { events } from "@/utils/config";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { id } = useParams();
  const [ticketDate, setTicketDate] = useState();
  const [showTicket, setShowTicket] = useState(false);
  const [quantitySelection, setQuantitySelection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookTicket();
  }, []);

  const bookTicket = async () => {
    const payload = {
      event_id: id,
    };

    try {
      const response = await axios.post(`${events.GET_TICKETS_DATA}`, payload);

      setTicketDate(response.data.data);
      setIsLoading(false);
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
          setError(true);
          toast.error(data.message);
          setIsLoading(false);
        }
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div>
        <TicketsSlider
          data={ticketDate}
          setShowTicket={setShowTicket}
          showTicket={showTicket}
          quantitySelection={quantitySelection}
          setQuantitySelection={setQuantitySelection}
        />
      </div>
    </div>
  );
};

export default Page;
