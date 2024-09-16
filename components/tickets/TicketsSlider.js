"use client";
import React, { useEffect, useState } from "react";
import ShortTicket from "./ShortTicket";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "next/navigation";
import axios from "axios";
import { events } from "@/utils/config";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "../checkout/Checkout";
import SeasonPass from "./SeasonPass";
import { useDispatch } from "react-redux";

const TicketsSlider = ({ data, setShowTicket, showTicket }) => {
  // console.log("data", data);
  const [isMobile, setIsMobile] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [checkoutPage, setCheckOutPage] = useState(false);
  const { id } = useParams();
  const [count, setCount] = useState({});
  const [showCount, setShowCount] = useState({});
  const [eventTicket, setEventTicket] = useState([]);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    totalTickets: 0,
    selectedTickets: [],
  });

  // console.log("ticketData", ticketData);
  // console.log(count);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleShowTicket = async (eventTicketId) => {
    console.log("id", id);
    const payload = {
      event_id: id,
      eventDateTime_id: eventTicketId,
    };

    try {
      const response = await axios.post(`${events.GET_TICKETS_BY_ID}`, payload);
      // console.log(response.data.data);
      setTicketData(response.data.data);
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
          // setError(true);
          setShowTicket(false);
          toast.error(data.message);
        }
      }
    }

    setShowTicket(true);
  };

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

  //   // console.log("increase", ticketId);
  //   setCount({
  //     [ticketId]: (count[ticketId] || 0) + 1, // Set the count for the selected ticket
  //   });
  //   const bookingObj = ticketData.find(
  //     (ticket) => ticket.Ticket_Id === ticketId
  //   );
  //   // console.log("bookingObj", bookingObj);
  //   const bookingLimit = bookingObj.BookingMaxLimit;
  //   console.log("booking limit", bookingLimit);
  //   if (Object.values(count) < bookingLimit) {
  //     setCount({
  //       [ticketId]: (count[ticketId] || 0) + 1, // Set the count for the selected ticket
  //     });
  //     setShowCount({
  //       [ticketId]: true,
  //     });
  //   } else {
  //     // alert("Exceeding booking limit");
  //     toast.error("Exceeding booking limit");
  //     return;
  //   }
  //   // Ensure only the selected ticket shows the counter
  //   setBookingData({ ...bookingData, totalTickets: Object.values(count) });
  //   // console.log("handleincrement", count);
  //   // console.log("booikingdata", bookingData);
  // };

  const handleIncrease = (ticketId) => {
    console.log("increasesd", ticketId);
    // Find the booking object for the specific ticket
    const bookingObj = ticketData.find(
      (ticket) => ticket.Ticket_Id === ticketId
    );
    if (!bookingObj) {
      toast.error("Ticket not found");
      return;
    }

    const bookingLimit = bookingObj.BookingMaxLimit;

    // Calculate the current count for the ticket
    const currentCount = count[ticketId] || 0;

    // Calculate the total number of tickets including the current increase
    const totalCount = Object.values(count).reduce(
      (acc, value) => acc + value,
      0
    );

    // Check if the new count would exceed the booking limit
    if (currentCount + 1 > bookingLimit || totalCount + 1 > bookingLimit) {
      toast.error("Exceeding booking limit");
      return;
    }

    // Update the count and state
    setCount((prevCount) => ({
      ...prevCount,
      [ticketId]: (prevCount[ticketId] || 0) + 1,
    }));

    // Ensure only the selected ticket shows the counter
    setShowCount((prevShowCount) => ({
      ...prevShowCount,
      [ticketId]: true,
    }));

    // Update booking data
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      totalTickets: Object.values(count).map((count) => count),
    }));
  };

  const handleDecrease = (ticketId) => {
    // console.log("decerease", ticketId);
    // console.log(ticketId);
    setCount((prevCounts) => {
      const newCount = Math.max((prevCounts[ticketId] || 0) - 1, 0);
      if (newCount === 0) {
        setShowCount({});
        return {};
      }
      // console.log("handledecrement", counts);
      setBookingData({ ...bookingData, totalTickets: Object.values(count) });
      return { [ticketId]: newCount }; // Store only the current ticket's count
    });
  };

  const handleShowCount = (ticketId) => {
    // console.log(ticketId);
    setShowCount((prevShowCount) => ({
      ...prevShowCount,
      [ticketId]: true,
    }));
  };

  const totalTickets = Object.values(count).reduce(
    (acc, count) => acc + count,
    0
  );
  const totalPrice = ticketData.reduce(
    (acc, ticket) => acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
    0
  );

  // console.log("totalPrice", totalPrice);
  const calculateTotals = () => {
    const totalTickets = Object.values(count).reduce(
      (acc, count) => acc + count,
      0
    );
    const totalPrice = ticketData.reduce(
      (acc, ticket) =>
        acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
      0
    );
    const selectedTickets = ticketData.filter(
      (ticket) => count[ticket.Ticket_Id] > 0
    );

    setBookingData({
      totalPrice,
      totalTickets,
      selectedTickets,
    });
  };

  // console.log("booking data", bookingData);
  const handleContinue = () => {
    calculateTotals();
    setCheckOutPage(true);
  };

  const handleSeasonPass = async () => {
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_SEASON_PASS}`, payload);
      setTicketData(response.data.data);
      // console.log("data", response.data.data);
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
          // setError(true);
          toast.error(data.message);
        }
      }
    }
    setShowTicket(true);
  };
  // console.log("ticketData", ticketData);
  // console.log("data", data);

  const isAnyCountActive = Object.values(showCount).some((value) => value);

  // console.log("bookingData", bookingData);
  return (
    <div>
      <Toaster />
      {!checkoutPage ? (
        <>
          <div className="p-4 md:px-8">
            <div className="md:px-6">
              <h1 className="md:text-3xl  text-xl md:mt-0 mt-4 capitalize text-blue-900 font-bold border-b-2 border-gray-200 pb-3">
                {data?.EventName}
              </h1>
              <div>
                <p className="capitalize mt-4  text-xl font-bold ">
                  Select date:
                </p>

                {isMobile ? (
                  <Swiper spaceBetween={20} slidesPerView={3} className="mt-3 ">
                    <SwiperSlide>
                      {data?.DateTimeDate.length > 1 && (
                        <div
                          onClick={() => handleSeasonPass()}
                          className="cursor-pointer mt-4"
                        >
                          <div
                            className="border border-gray-500 bg-gray-200 flex items-center text-center md:justify-start gap-3 md:gap-5 flex-col rounded-md p-4 
                      h-auto w-24 md:w-32"
                          >
                            <p
                              className="capitalize relative before:inline-block before:w-10 before:h-[1px] before:bg-gray-400 
                      before:absolute before:-bottom-0 before:left-2 text-xs md:text-sm"
                            >
                              Season pass
                            </p>
                            <p className="capitalize text-xs md:text-sm">{`${
                              data?.DateTimeDate[0].Date
                            }-${
                              data?.DateTimeDate[data.DateTimeDate.length - 1]
                                .Date
                            } ${data?.DateTimeDate[0].Month}`}</p>

                            <p className="capitalize text-xs md:text-sm text-center">
                              <p className="capitalize text-xs md:text-sm">
                                Start from
                              </p>
                              {`${data?.DateTimeDate[0].Time}`}
                            </p>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                    {data?.DateTimeDate.map((ticket, index) => (
                      <SwiperSlide key={data.id}>
                        <div
                          key={index}
                          className="md:mt-0 mt-4 cursor-pointer "
                          onClick={() =>
                            handleShowTicket(ticket.eventDateTime_id)
                          }
                        >
                          <ShortTicket data={ticket} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="mt-4 flex gap-4">
                    {data?.DateTimeDate.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="cursor-pointer "
                        onClick={() =>
                          handleShowTicket(ticket.eventDateTime_id)
                        }
                      >
                        <ShortTicket data={ticket} />
                      </div>
                    ))}
                    {data?.DateTimeDate.length > 1 && (
                      <div
                        onClick={() => handleSeasonPass()}
                        className="cursor"
                      >
                        <div
                          className="border border-gray-500 bg-gray-200 flex items-center justify-start gap-5 flex-col rounded-md p-4 
                      h-auto w-24 md:w-32"
                        >
                          <p
                            className="capitalize relative before:inline-block before:w-10 before:h-[1px] before:bg-gray-400 
                      before:absolute before:-bottom-0 before:left-2 text-xs md:text-sm"
                          >
                            Season pass
                          </p>
                          <p className="capitalize text-xs md:text-sm">{`${
                            data?.DateTimeDate[0].Date
                          }-${
                            data?.DateTimeDate[data.DateTimeDate.length - 1]
                              .Date
                          } ${data?.DateTimeDate[0].Month}`}</p>

                          <p className="capitalize text-xs md:text-sm text-center">
                            <p className="capitalize text-xs md:text-sm">
                              Start from
                            </p>
                            {`${data?.DateTimeDate[0].Time}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" mt-2 px-4 md:px-14 py-6 mb-20">
            {showTicket && (
              <div>
                <h1 className="md:text-2xl   font-bold">Choose ticket</h1>
                {ticketData?.map((ticket) => {
                  const counts = count[ticketData.Ticket_Id] || 0;
                  console.log(counts);
                  return (
                    <div className=" md:h-auto  rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300">
                      <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex flex-col gap-2">
                          <p className="md:text-xl capitalize">
                            {ticket.TicketName}{" "}
                          </p>
                          {ticket.TicketDescprition && (
                            <p className="md:w-[70%] text-gray-600">
                              {ticket.TicketDescprition}
                            </p>
                          )}
                          <p className="font-bold md:text-lg">
                            {" "}
                            &#8377; {ticket.TicketPrice}{" "}
                          </p>
                        </div>
                        <div>
                          {/* {quantitySelection ? (
                        <button className=" text-blue-900 font-bold px-8 py-3 rounded-md border border-blue-900">
                          <div className="flex  gap-4">
                            <span
                              onClick={() => handleDecrease(ticket.Ticket_Id)}
                            >
                              -
                            </span>
                            <span>{counts}</span>
                            <span
                              onClick={() => handleIncrease(ticket.Ticket_Id)}
                            >
                              +
                            </span>
                          </div>
                        </button>
                      ) : (
                        <button
                          className="bg-blue-900 text-white md:px-8 md:py-3 py-2 px-4 rounded-md"
                          onClick={() => setQuantitySelection(true)}
                        >
                          Add
                        </button>
                      )} */}
                          {showCount[ticket.Ticket_Id] ? (
                            <div className="flex justify-center items-center mt-4">
                              <button
                                className="bg-[#666666] text-white py-1 px-2 rounded-l"
                                onClick={() => handleDecrease(ticket.Ticket_Id)}
                              >
                                -
                              </button>
                              <span className="mx-4">{counts}</span>
                              <button
                                className="bg-[#666666] text-white py-1 px-2 rounded-r"
                                onClick={() => handleIncrease(ticket.Ticket_Id)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className={` ${
                                isAnyCountActive
                                  ? "bg-[#666666] bg-opacity-40 cursor-not-allowed"
                                  : "bg-[#666666]"
                              }   text-white py-2 px-4 rounded mx-auto mt-4`}
                              onClick={() => handleShowCount(ticket.Ticket_Id)}
                              disabled={isAnyCountActive}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Footer for Total Count and Price */}
          {totalTickets > 0 && (
            <div className="fixed bottom-0 w-[90%] h-[100px] bg-white shadow-md p-6 flex justify-between items-center">
              <div className="w-[50%] pl-6">
                <p className="text-2xl font-bold">Rs.{totalPrice}</p>
                <p className="text-xl font-bold">{totalTickets} Ticket</p>
              </div>
              <div className="w-[35%]">
                <button
                  onClick={handleContinue}
                  className="bg-[#666666] w-[50%] text-white py-2 px-4 rounded"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Checkout
          bookingData={bookingData}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      )}
    </div>
  );
};

export default TicketsSlider;
