"use client";
import React, { useEffect, useState } from "react";
import ShortTicket from "./ShortTicket";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { events } from "@/utils/config";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setTicketData,
  setBookingDataObj,
  setEventId,
  reset_state,
  setTicketId,
} from "../../store/slices/booking";

const TicketsSlider = ({ data, setShowTicket, showTicket }) => {
  const [isMobile, setIsMobile] = useState(false);
  // const [isSeasonPass]
  const { id } = useParams();

  const [selectedShortTicket, setSelectedShortTicket] = useState();

  const [eventTicket, setEventTicket] = useState([]);

  const bookingData = useSelector((store) => store.booking.bookingData);

  const storedEventId = useSelector((store) => store.booking.eventId);

  const [showCount, setShowCount] = useState({});

  const [count, setCount] = useState(() => {
    const savedCounts = localStorage.getItem("ticketCounts");
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  const ticketId = useSelector((store) => store.booking.ticketId);

  const [finalBookingData, setFinalBookingData] = useState({
    totalTickets: 0,
    totalPrice: 0,
    selectedTickets: [],
  });

  const [eventIdCheck, setEventIdCheck] = useState(null);
  const [showTicketId, setShowTicketId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (storedEventId !== null) {
      setEventIdCheck("id", id === storedEventId);
    }
  }, [count, id]);

  useEffect(() => {
    const savedCounts = localStorage.getItem("ticketCounts");
    if (savedCounts === null || savedCounts === "{}") {
      setCount({});
    }
  }, []);

  useEffect(() => {
    if (ticketId !== null) {
      handleShowTicket(ticketId);
      // Automatically show the ticket section
    }
    if (data.DateTimeDate.length === 1) {
      // console.log(data.DateTimeDate[0].eventDateTime_id);
      setShowTicketId(data.DateTimeDate[0].eventDateTime_id);
      handleShowTicket(data.DateTimeDate[0].eventDateTime_id);
    }
  }, [ticketId]);

  const handleIncreaseandSetEventId = (ticketId) => {
    const bookingObj = eventTicket?.find(
      (ticket) => ticket.Ticket_Id === ticketId
    );

    const bookingLimit = bookingObj.BookingMaxLimit;

    if (Object.values(count) < bookingLimit) {
      const updatedCount = {
        [ticketId]: (count[ticketId] || 0) + 1, // Set the count for the selected ticket
      };

      setCount(updatedCount);
      const updatedShowCount = {
        [ticketId]: true,
      };
      setShowCount(updatedShowCount);

      localStorage.setItem("ticketCounts", JSON.stringify(updatedCount));
    } else {
      toast.error("Exceeding booking limit");
    }
    setFinalBookingData;
    ({ ...finalBookingData, totalTickets: Number(Object.values(count)) });
  };

  const handleDecreaseandSetEventId = (ticketId) => {
    setCount((prevCounts) => {
      // Get the current count for the ticket
      const currentCount = prevCounts[ticketId] || 0;

      // Calculate the new count, ensuring it doesn't go below 0
      const newCount = Math.max(currentCount - 1, 0);

      // Update showCount
      const updatedShowCount = { ...showCount };

      if (newCount === 0) {
        // Remove ticket from showCount if count is 0
        delete updatedShowCount[ticketId];
        dispatch(setTicketId(null));
      } else {
        // Ensure it stays true if count > 0
        updatedShowCount[ticketId] = true;
      }

      setShowCount(updatedShowCount);

      // Prepare the new counts object
      const updatedCounts = {
        ...prevCounts,
        [ticketId]: newCount, // Update the specific ticket's count
      };

      // Remove ticket from counts if it's 0
      if (newCount === 0) {
        delete updatedCounts[ticketId];
      }

      // Save updated counts in localStorage
      localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));

      // Calculate the total number of tickets remaining
      const totalTickets = Object.values(updatedCounts).reduce(
        (acc, count) => acc + count,
        0
      );

      // Update finalBookingData based on the new totalTickets
      let updatedFinalBookingData;
      if (totalTickets > 0) {
        // Keep the previous data if there are tickets remaining
        updatedFinalBookingData = {
          ...finalBookingData,
          totalTickets,
          totalPrice: finalBookingData.totalPrice, // You can calculate this if needed
          selectedTickets: finalBookingData.selectedTickets, // Update this array if needed
        };
      } else {
        // Nullify the finalBookingData if no tickets are left
        updatedFinalBookingData = {
          totalTickets: 0,
          totalPrice: 0,
          selectedTickets: [],
        };
      }

      // Update the state with the modified finalBookingData
      setFinalBookingData(updatedFinalBookingData);
      dispatch(setBookingDataObj(updatedFinalBookingData));

      return updatedCounts; // Return the updated counts
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleShowTicket = async (eventTicketId) => {
    setSelectedShortTicket(eventTicketId);
    setShowTicketId(eventTicketId);
    // dispatch(setTicketId(eventTicketId));
    const currentEventId = id;

    const totalTicketsInCart = Object.values(count).reduce(
      (acc, num) => acc + num,
      0
    );

    if (totalTicketsInCart > 0 && storedEventId !== currentEventId) {
      // Show a message that tickets from another event are already in the cart
      toast.error(
        "You already have tickets in your cart. Please clear previous tickets before selecting new ones."
      );
      return; // Exit the function early
    }

    const payload = {
      event_id: id,
      eventDateTime_id: eventTicketId,
    };

    try {
      const response = await axios.post(`${events.GET_TICKETS_BY_ID}`, payload);

      // setTicketData(response.data.data);
      setEventTicket(response.data.data);

      localStorage.setItem(
        "convenienceFee",
        JSON.stringify({
          ConfeeUnit: response.data.data[0].ConfeeUnit,
          ConValue: response.data.data[0].ConValue,
        })
      );
      dispatch(setTicketData(response.data.data));
    } catch (error) {
      // setIsLoading(false);
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

          setShowTicket(false);
          setEventTicket([]);
          toast.error(data.message);
        }
      }
    }

    setShowTicket(true);
  };

  useEffect(() => {
    if (bookingData) {
      const updatedTotalTickets = Object.values(count).reduce(
        (acc, num) => acc + num,
        0
      );

      // Calculate totalPrice based on current count
      const updatedTotalPrice =
        eventTicket.reduce((acc, ticket) => {
          const ticketCount = count[ticket.Ticket_Id] || 0; // Get the current count for the ticket
          return acc + ticketCount * ticket.TicketPrice; // Accumulate the total price
        }, 0) || bookingData.totalPrice; // Fallback to existing totalPrice if calculation results in 0

      setFinalBookingData((prevBookingData) => ({
        ...prevBookingData,
        totalTickets: updatedTotalTickets,
        totalPrice: updatedTotalPrice, // Set the recalculated totalPrice
        selectedTickets: bookingData.selectedTickets,
      }));
    }
  }, [count]); // Add eventTicket as a dependency if it can change

  useEffect(() => {
    dispatch(setBookingDataObj({ ...finalBookingData }));
  }, [finalBookingData]);

  const handleShowCount = (ticketId) => {
    setShowCount((prevShowCount) => ({
      ...prevShowCount,
      [ticketId]: true,
    }));
  };

  const totalTickets = Object.values(count).reduce(
    (acc, count) => acc + count,
    0
  );

  const totalPrice =
    bookingData?.totalPrice > 0
      ? bookingData?.totalPrice // Use existing totalPrice if available
      : eventTicket.reduce(
          (acc, ticket) =>
            acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
          0
        );

  const calculateTotals = () => {
    const totalTickets = Object.values(count).reduce(
      (acc, count) => acc + count,
      0
    );
    const totalPrice =
      bookingData?.totalPrice > 0
        ? bookingData?.totalPrice // Use existing totalPrice if available
        : eventTicket.reduce(
            (acc, ticket) =>
              acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
            0
          );

    const selectedTickets =
      bookingData?.selectedTickets.length > 0
        ? bookingData?.selectedTickets
        : eventTicket.filter((ticket) => count[ticket.Ticket_Id] > 0);

    setFinalBookingData({ totalPrice, totalTickets, selectedTickets });
  };

  const handleContinue = () => {
    calculateTotals();

    dispatch(setEventId(id));
    dispatch(setTicketId(showTicketId));
    router.push(`/events/tickets/${id}/checkout`);
  };

  const handleSeasonPass = async () => {
    const currentEventId = id;

    const totalTicketsInCart = Object.values(count).reduce(
      (acc, num) => acc + num,
      0
    );
    if (totalTicketsInCart > 0 && storedEventId !== currentEventId) {
      // Show a message that tickets from another event are already in the cart
      toast.error(
        "You already have tickets in your cart. Please clear previous tickets before selecting new ones."
      );
      return; // Exit the function early
    }
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_SEASON_PASS}`, payload);
      setEventTicket(response.data.data);
      dispatch(setTicketData(response.data.data));
      setSelectedShortTicket(response.data.data[0].Ticket_Id);
      // dispatch(setTicketId(response.data.data[0].Ticket_Id));
      setShowTicketId(response.data.data[0].Ticket_Id);
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
          toast.error(data.message);
        }
      }
    }
    setShowTicket(true);
  };

  const isAnyCountActive = Object.values(showCount).some((value) => value);

  // console.log(isAnyCountActive);
  // console.log(showCount);
  // console.log(count);

  const clearCart = () => {
    dispatch(reset_state());
    setCount({});
    setShowTicketId(null);
    setShowCount({});
  };

  const handleContinueCheckout = () => {
    router.push(`/events/tickets/${storedEventId}/checkout`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-50 md:py-6 h-full flex-grow">
        <Toaster />

        <>
          <div className="p-4 ">
            <div className="md:px-2">
              <h1 className="md:text-3xl  text-xl md:mt-0 mt-4 capitalize text-blue-900 font-bold border-b-2 border-gray-200 pb-3">
                {data?.EventName}
              </h1>
              <div>
                <p className="capitalize mt-4  text-xl font-bold ">
                  Select date:
                </p>

                {isMobile ? (
                  <Swiper
                    className="mt-4"
                    spaceBetween={6}
                    slidesPerView={1}
                    breakpoints={{
                      320: {
                        slidesPerView: 2.6,
                        spaceBetween: 20,
                      },
                      425: {
                        slidesPerView: 3.2,
                        spaceBetween: 20,
                      },
                      500: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                      },
                    }}
                  >
                    {data?.DateTimeDate.map((ticket) => (
                      <SwiperSlide key={ticket.id}>
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            handleShowTicket(ticket.eventDateTime_id)
                          }
                        >
                          <ShortTicket
                            data={ticket}
                            selectedShortTicket={selectedShortTicket}
                          />
                        </div>
                      </SwiperSlide>
                    ))}

                    {data?.SeasonPassCount > 0 && (
                      <SwiperSlide>
                        <div
                          onClick={handleSeasonPass}
                          className="cursor-pointer"
                        >
                          <div
                            className="border border-blue-900 bg-white flex items-center justify-start gap-5 flex-col rounded-md px-4 py-2
                      h-36 md:h-40 w-24 md:w-28"
                          >
                            <p
                              className="capitalize text-center relative before:inline-block before:w-10 before:h-[2px] before:bg-blue-800 
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
                      </SwiperSlide>
                    )}
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
                        <ShortTicket
                          data={ticket}
                          selectedShortTicket={selectedShortTicket}
                        />
                      </div>
                    ))}
                    {data?.SeasonPassCount > 0 && (
                      <div
                        onClick={handleSeasonPass}
                        className="cursor-pointer"
                      >
                        <div
                          className="border border-blue-900 bg-white flex items-center justify-start gap-5 flex-col rounded-md p-2
                    h-36 md:h-40 w-24 md:w-28"
                        >
                          <p
                            className="capitalize text-blue-900 font-semibold  relative before:inline-block before:w-10 md:py-1 before:h-[2px] before:bg-blue-800 
                      before:absolute before:-bottom-0 before:left-6 text-center text-xs md:text-sm"
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

          <div className="mt-2 px-4  pt-6 pb-32">
            {(eventIdCheck === null || eventIdCheck) &&
            showTicket &&
            eventTicket?.length > 0 ? (
              <div>
                <h1 className="md:text-2xl font-bold">Choose ticket:</h1>
                {bookingData?.selectedTickets?.length === 0
                  ? eventTicket?.map((ticket) => {
                      const counts = count[ticket.Ticket_Id] || 0;
                      return (
                        <div
                          className="md:h-auto bg-white rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300"
                          key={ticket.Ticket_Id}
                        >
                          <div className="flex items-center justify-between px-4 py-4">
                            <div className="flex flex-col gap-2">
                              <p className="md:text-xl capitalize">
                                {ticket.TicketName}
                              </p>
                              {ticket.TicketDescprition && (
                                <p className="md:w-[70%] text-gray-600">
                                  {ticket.TicketDescprition}
                                </p>
                              )}
                              <p className="font-semibold md:text-lg">
                                &#8377; {ticket.TicketPrice}
                              </p>
                            </div>
                            <div>
                              {showCount[ticket.Ticket_Id] ? (
                                <div className="flex justify-center items-center mt-4">
                                  <button
                                    className="bg-blue-900 text-white py-1 px-2 rounded-l"
                                    onClick={() =>
                                      handleDecreaseandSetEventId(
                                        ticket.Ticket_Id
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="mx-4">{counts}</span>
                                  <button
                                    className="bg-blue-900 text-white py-1 px-2 rounded-r"
                                    onClick={() =>
                                      handleIncreaseandSetEventId(
                                        ticket.Ticket_Id
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className={`${
                                    isAnyCountActive
                                      ? "bg-blue-900 bg-opacity-40 cursor-not-allowed"
                                      : "bg-blue-900"
                                  } text-white py-3 px-6 rounded mx-auto mt-4`}
                                  onClick={() =>
                                    handleShowCount(ticket.Ticket_Id)
                                  }
                                  disabled={isAnyCountActive}
                                >
                                  Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : eventTicket?.map((ticket) => {
                      const counts = count[ticket.Ticket_Id] || 0;
                      const isSelectedTicket =
                        bookingData?.selectedTickets?.find(
                          (selected) => selected.Ticket_Id === ticket.Ticket_Id
                        );

                      return (
                        <div
                          className="md:h-auto bg-blue-500 rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300"
                          key={ticket.Ticket_Id}
                        >
                          <div className="flex items-center justify-between px-4 py-4">
                            <div className="flex flex-col gap-2">
                              <p className="md:text-xl capitalize">
                                {ticket.TicketName}
                              </p>
                              {ticket.TicketDescprition && (
                                <p className="md:w-[70%] text-gray-600">
                                  {ticket.TicketDescprition}
                                </p>
                              )}
                              <p className="font-semibold md:text-lg">
                                &#8377; {ticket.TicketPrice}
                              </p>
                            </div>
                            <div>
                              {isSelectedTicket ? (
                                <div className="flex justify-center items-center mt-4">
                                  <button
                                    className="bg-blue-900 text-white py-1 px-2 rounded-l"
                                    onClick={() =>
                                      handleDecreaseandSetEventId(
                                        ticket.Ticket_Id
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="mx-4">
                                    {bookingData?.totalTickets}
                                  </span>
                                  <button
                                    className="bg-blue-900 text-white py-1 px-2 rounded-r"
                                    onClick={() =>
                                      handleIncreaseandSetEventId(
                                        ticket.Ticket_Id
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className={`${
                                    isAnyCountActive
                                      ? "bg-blue-900 bg-opacity-40 cursor-not-allowed"
                                      : "bg-blue-900"
                                  } text-white py-3 px-6 rounded mx-auto mt-4`}
                                  onClick={() =>
                                    handleShowCount(ticket.Ticket_Id)
                                  }
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
            ) : null}
          </div>

          {/* Footer for Total Count and Price */}

          {storedEventId !== null && storedEventId !== id && (
            <div className="fixed bottom-0 left-0 right-0  bg-white shadow-md p-6 flex md:flex-row flex-col gap-6 justify-between items-center z-50">
              <div className="flex flex-col gap-2">
                <p className="lg:text-2xl md:text-lg text-base font-semibold">
                  You already have tickets from another event.
                </p>
                <p className="md:text-lg text-base text-gray-600">
                  Either proceed to checkout or clear the cart
                </p>
              </div>
              <div className="text-right flex justify-between gap-4 ">
                <button
                  onClick={handleContinueCheckout}
                  className="bg-blue-900 text-white py-2 px-8 md:px-14 rounded"
                >
                  Continue
                </button>
                <button
                  onClick={clearCart}
                  className="bg-gray-300 text-black py-2 px-8 md:px-14 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </>
      </div>

      {(storedEventId === id || storedEventId === null) && (
        <div>
          {totalTickets > 0 ? (
            <div className="fixed  bottom-0 w-[100%]  z-50 md:px-20  bg-white shadow-md p-6 flex justify-between items-center flex-col">
              <div className="flex flex-col md:gap-2 ">
                <p className="md:text-2xl text-lg font-semibold">
                  ₹ {totalPrice}
                </p>
                <p className="md:text-xl text-lg text-gray-600">
                  {totalTickets} Ticket
                </p>
              </div>
              <div className=" text-right flex gap-4">
                <button
                  onClick={handleContinue}
                  className="bg-blue-900   text-white md:py-2 px-14 rounded"
                >
                  Continue
                </button>
                <button
                  onClick={clearCart}
                  className="bg-gray-300 text-black py-2 px-8 md:px-14 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            bookingData.totalTickets > 0 && (
              <div className="relative md:px-20  bg-white shadow-md p-6 flex justify-between items-center">
                <div className="flex flex-col gap-2 ">
                  <p className="md:text-2xl text-lg font-semibold">
                    ₹ {bookingData?.totalPrice}
                  </p>
                  <p className="md:text-xl text-lg text-gray-600">
                    {bookingData?.totalTickets} Ticket
                  </p>
                </div>
                <div className=" text-right flex gap-4 ">
                  <button
                    onClick={handleContinue}
                    className="bg-blue-900   text-white py-2 px-14 rounded"
                  >
                    Continue
                  </button>
                  <button
                    onClick={clearCart}
                    className="bg-gray-300 text-black py-2 px-8 md:px-14 rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TicketsSlider;
