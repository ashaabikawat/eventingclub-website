import React, { useEffect, useState } from "react";
import Tickets from "./Tickets";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { customer } from "@/utils/config";
import { useDispatch } from "react-redux";
import Loading from "../common/loading/Loading";

const TicketById = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEventsTicket, setUpcomingEventsTicket] = useState([]);
  const [pastEventsTicket, setPastEventsTicket] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

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
      setIsLoading(false);
      setUpcomingEventsTicket(response.data.data.UpcomingEventTickets);
      setPastEventsTicket(response.data.data.PastEventTickets);
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
          setIsLoading(false);
          setUpcomingEventsTicket([]);
          setPastEventsTicket([]);
        }
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="h-[100%]  w-full  pb-6">
      {upcomingEventsTicket?.length > 0 ? (
        <div className="h-[100%] ">
          <div className="h-[100%] ">
            <h1 className="text-black md:text-xl  font-semibold mb-4 bebas-neue">
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
              <h1 className="text-black md:text-xl  font-semibold mb-4 bebas-neue">
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
      ) : (
        <div className="h-[100%] py-10 md:py-6 nunito">
          <div className="h-[100%] flex flex-col gap-4 justify-center items-center">
            <p className="md:text-lg font-semibold text-black">
              You don't have any tickets
            </p>
            <button
              className="bg-blue-900 text-white py-2 px-14 rounded"
              onClick={() => {
                router.push("/");
              }}
            >
              Back to main page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketById;
