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

const Page = () => {
  const { id } = useParams();
  const [ticketDate, setTicketDate] = useState();
  const [showTicket, setShowTicket] = useState(false);
  const [eventTicket, setEventTicket] = useState([]);
  const [quantitySelection, setQuantitySelection] = useState(false);
  const [count, setCount] = useState({});
  const [showCount, setShowCount] = useState({});
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    totalTickets: 0,
    selectedTickets: [],
  });
  const [checkoutPage, setCheckOutPage] = useState(false);

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
  useEffect(() => {
    // Update bookingData whenever counts change
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      totalTickets: Object.values(count),
      totalPrice: eventTicket.reduce(
        (acc, ticket) => acc + (count[ticket._id] || 0) * ticket.Price,
        0
      ),
    }));
  }, [count]);

  const handleIncrease = (ticketId) => {
    console.log("increase");
    //  setCounts({
    //     [ticketId]: (counts[ticketId] || 0  ) + 1, // Set the count for the selected ticket
    //   })
    // const bookingObj = eventTicketsData.find(
    //   (ticket) => ticket._id === ticketId
    // );
    // const bookingLimit = bookingObj.BookingMaxLimit;
    // if (Object.values(counts) < bookingLimit) {
    //   setCounts({
    //     [ticketId]: (counts[ticketId] || 0) + 1, // Set the count for the selected ticket
    //   });
    //   setShowCount({
    //     [ticketId]: true,
    //   });
    // } else {
    //   // alert("Exceeding booking limit");
    //   toast.error("Exceeding booking limit");
    // }
    // Ensure only the selected ticket shows the counter
    // setBookingData({ ...bookingData, totalTickets: Object.values(counts) });
    // console.log("handleincrement", counts);
    // console.log("booikingdata", bookingData);
  };

  const handleDecrease = (ticketId) => {
    console.log("decerease");
    // console.log(ticketId);
    // setCount((prevCounts) => {
    //   const newCount = Math.max((prevCounts[ticketId] || 0) - 1, 0);
    //   if (newCount === 0) {
    //     setShowCount({});
    //     return {};
    //   }
    //   // console.log("handledecrement", counts);
    //   setBookingData({ ...bookingData, totalTickets: Object.values(counts) });
    //   return { [ticketId]: newCount }; // Store only the current ticket's count
    // });
  };

  const handleShowCount = (ticketId) => {
    // setShowCount((prevShowCount) => ({
    //   ...prevShowCount,
    //   [ticketId]: true,
    // }));
  };
  return (
    <div>
      {!checkoutPage ? (
        <div>
          <TicketsSlider
            data={ticketDate}
            setShowTicket={setShowTicket}
            showTicket={showTicket}
          />

          <div className=" mt-2 md:px-14">
            {showTicket && (
              <div>
                <h1 className="md:text-2xl font-bold">Choose ticket</h1>
                <div className=" md:h-36  rounded-md md:mt-6 md:w-full md:mb-4 border border-gray-300">
                  <div className="flex items-center px-4 py-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-xl ">General</p>
                      <p className="md:w-[70%] text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed id sodales erat. Aenean auctor volutpat ipsum, a
                        vestibulum orci lacinia eget. Nunc eu justo ut turpis
                        mollis commodo.
                      </p>
                      <p className="font-bold md:text-lg"> &#8377; 550 </p>
                    </div>
                    <div>
                      {quantitySelection ? (
                        <button className=" text-blue-900 font-bold px-8 py-3 rounded-md border border-blue-900">
                          <div className="flex  gap-4">
                            <span onClick={handleDecrease}>-</span>
                            <span>0</span>
                            <span onClick={handleIncrease}>+</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          className="bg-blue-900 text-white px-8 py-3 rounded-md"
                          onClick={() => setQuantitySelection(true)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
