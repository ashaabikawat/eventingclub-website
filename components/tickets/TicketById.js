import React, { useEffect, useState } from "react";
import Tickets from "./Tickets";
import { useParams } from "next/navigation";
import axios from "axios";
import { customer } from "@/utils/config";
import Footer from "../footer/Footer";

const TicketById = () => {
  const { id } = useParams();
  const [upcomingEventsTicket, setUpcomingEventsTicket] = useState([]);
  const [pastEventsTicket, setPastEventsTicket] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const payload = {
      customer_id: id,
    };
    try {
      const response = await axios.post(
        `${customer.GET_TICKETS_BY_ID}`,
        payload
      );
      console.log(response.data.data);
      setUpcomingEventsTicket(response.data.data.UpcomingEventTickets);
      setPastEventsTicket(response.data.data.PastEventTickets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-black md:text-2xl md:mb-6 font-semibold">
          Upcoming Events:
        </h1>
        <div>
          {upcomingEventsTicket?.map((ticket) => (
            <Tickets ticket={ticket} />
          ))}
        </div>
      </div>
      {pastEventsTicket?.length > 0 && (
        <div>
          <h1 className="text-black md:text-2xl md:mb-6 font-semibold">
            Past Events:
          </h1>
          <div>
            {pastEventsTicket?.map((ticket) => (
              <Tickets ticket={ticket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketById;
