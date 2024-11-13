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
  setBookingDataObj,
  setEventId,
  reset_state,
  setTicketId,
  setTicketCounts,
  setConvenienceFee,
} from "../../store/slices/booking";
import SeasonPass from "./SeasonPass";
import { decryptData } from "@/utils/constants";

const TicketsSlider = ({ data, setShowTicket }) => {
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedShortTicket, setSelectedShortTicket] = useState();
  const [eventTicket, setEventTicket] = useState([]);
  const [isSeasonpassActive, setIsSeasonpassActive] = useState(false);
  const [showTicketId, setShowTicketId] = useState(null);
  const savedTicketCounts = useSelector((store) => store.bz8v2.o5p6);
  const [eventTicketDataForCalculations, setEventTicketDataForCalculations] =
    useState([]);
  const [count, setCount] = useState(() => {
    return savedTicketCounts ? savedTicketCounts : {};
  });
  const [showCount, setShowCount] = useState({});
  const isAnyCountActive = Object.values(showCount).some((value) => value);
  const [finalBookingData, setFinalBookingData] = useState({
    e5f6: 0,
    a1b2: 0,
    c3d4: [],
  });
  const bookingData = useSelector((store) => store.bz8v2.z1x0);
  // console.log(bookingData);
  const bookingDataTicketId = decryptData(
    useSelector((store) => store.bz8v2.k1l2),
    passphrase
  );
  // console.log(bookingDataTicketId);
  const storedEventId = decryptData(
    useSelector((store) => store.bz8v2.g7h8),
    passphrase
  );
  // console.log(storedEventId);
  // console.log(bookingDataTicketId);

  useEffect(() => {
    if (bookingDataTicketId !== null) {
      if (bookingData?.c3d4[0]?.TicketType === 2) {
        // console.log(bookingData?.selectedTickets[0]?.TicketType);
        handleShowTicket(bookingDataTicketId);
      }
      if (bookingData?.c3d4[0]?.TicketType === 3) {
        // console.log(bookingData?.selectedTickets[0]?.TicketType);
        handleSeasonPass(bookingDataTicketId);
      }
      // Automatically show the ticket section
    }
    if (data.DateTimeDate.length === 1) {
      // console.log(data.DateTimeDate[0].eventDateTime_id);

      setShowTicketId(data.DateTimeDate[0].eventDateTime_id);

      handleShowTicket(data.DateTimeDate[0].eventDateTime_id);
    }
  }, [bookingDataTicketId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleShowTicket = async (eventTicketId) => {
    toast.dismiss();
    setIsSeasonpassActive(false);
    // console.log(eventTicketId);
    setShowTicketId(eventTicketId);
    setSelectedShortTicket(eventTicketId);

    const currentEventId = id;

    if (currentEventId !== storedEventId && storedEventId !== null) {
      toast.error(
        "You already have tickets from another event. Please clear all tickets before selecting new ones."
      );
      setEventTicket([]);
      return; // Exit the function early
    }

    // const totalTicketsInCart = Object.values(count).reduce(
    //   (acc, num) => acc + num,
    //   0
    // );

    // if (totalTicketsInCart > 0) {
    //   // Show a message that tickets from another event are already in the cart
    // toast.error(
    //   "You already have tickets from another event. Please clear all tickets before selecting new ones."
    // );
    // setEventTicket([]);
    // return; // Exit the function early
    // }

    const payload = {
      event_id: id,
      eventDateTime_id: eventTicketId,
    };

    try {
      const response = await axios.post(`${events.GET_TICKETS_BY_ID}`, payload);

      setEventTicket(response.data.data);

      dispatch(
        setConvenienceFee({
          ConfeeUnit: response.data.data[0].ConfeeUnit,
          ConValue: response.data.data[0].ConValue,
        })
      );
      // dispatch(setTicketData(response.data.data));
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
          setShowTicket(false);
          toast.error(data.message);
        }
      }
    }

    setShowTicket(true);
  };

  const handleShowCount = (ticketId) => {
    setShowCount((prevShowCount) => ({
      ...prevShowCount,
      [ticketId]: true,
    }));
  };

  const handleIncreaseandSetEventId = (ticketId) => {
    toast.dismiss();
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

      // localStorage.setItem("ticketCounts", JSON.stringify(updatedCount));
      // dispatch(setTicketCounts(updatedCount));
    } else {
      toast.error("Exceeding booking limit");
    }
    setFinalBookingData;
    ({ ...finalBookingData, e5f6: Number(Object.values(count)) });
  };

  const handleDecreaseandSetEventId = (ticketId) => {
    toast.dismiss();
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
        // dispatch(setTicketId(null));
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
      // localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
      // dispatch(setTicketCounts(updatedCounts));

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
          e5f6,
          a1b2: finalBookingData.a1b2, // You can calculate this if needed
          c3d4: finalBookingData.c3d4, // Update this array if needed
        };
      } else {
        // Nullify the finalBookingData if no tickets are left
        updatedFinalBookingData = {
          e5f6: 0,
          a1b2: 0,
          c3d4: [],
        };
      }

      // Update the state with the modified finalBookingData
      setFinalBookingData(updatedFinalBookingData);
      // dispatch(setBookingDataObj(updatedFinalBookingData));

      return updatedCounts; // Return the updated counts
    });
  };

  const handleIncrease = (ticketId) => {
    toast.dismiss();
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
      // localStorage.setItem("ticketCounts", JSON.stringify(updatedCount));
      dispatch(setTicketCounts(updatedCount));
      const updatedTotalTickets = Object.values(updatedCount).reduce(
        (acc, val) => acc + val,
        0
      );
      const updatedTotalPrice = eventTicket.reduce(
        (acc, ticket) =>
          acc + (updatedCount[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
        0
      );
      // console.log(updatedTotalPrice);
      // console.log(updatedTotalTickets);
      const finalBookingObj = {
        ...bookingData,
        a1b2: updatedTotalPrice,
        e5f6: updatedTotalTickets,
      };

      dispatch(setBookingDataObj(finalBookingObj));
    } else {
      toast.error("Exceeding booking limit");
    }

    // setFinalBookingData;
    // ({ ...finalBookingData, totalTickets: Number(Object.values(count)) });
  };

  const handleDecrease = (ticketId) => {
    toast.dismiss();
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
        // dispatch(setTicketId(null));
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
      // localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
      // dispatch(setTicketCounts(updatedCounts));

      // Calculate the total number of tickets remaining
      const totalTickets = Object.values(updatedCounts).reduce(
        (acc, count) => acc + count,
        0
      );
      const updatedTotalPrice = eventTicket.reduce(
        (acc, ticket) =>
          acc + (updatedCounts[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
        0
      );

      // Update finalBookingData based on the new totalTickets
      let updatedFinalBookingData;
      if (totalTickets > 0) {
        // Keep the previous data if there are tickets remaining
        updatedFinalBookingData = {
          ...finalBookingData,
          e5f6,
          a1b2: updatedTotalPrice, // You can calculate this if needed
          c3d4: bookingData.c3d4, // Update this array if needed
        };
      } else {
        // Nullify the finalBookingData if no tickets are left
        updatedFinalBookingData = {
          e5f6: 0,
          a1b2: 0,
          c3d4: [],
        };
        dispatch(setEventId(null));
        dispatch(setTicketId(null));
        dispatch(setTicketCounts({}));
      }

      dispatch(setBookingDataObj(updatedFinalBookingData));
      dispatch(setTicketCounts(updatedCounts));
      // Update the state with the modified finalBookingData
      // dispatch(setBookingDataObj(updatedFinalBookingData));
      // dispatch(setBookingDataObj(updatedFinalBookingData));

      return updatedCounts; // Return the updated counts
    });
  };

  const totalPrice = eventTicket.reduce(
    (acc, ticket) => acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
    0
  );

  const totalTickets = Object.values(count).reduce(
    (acc, count) => acc + count,
    0
  );

  useEffect(() => {
    setEventTicketDataForCalculations(eventTicket);
  }, [totalTickets]);
  // console.log("eventTicket", eventTicket);
  // console.log("forcalculations", eventTicketDataForCalculations);
  const calculateTotals = () => {
    const totalTickets = Object.values(count).reduce(
      (acc, count) => acc + count,
      0
    );

    // const totalPrice = eventTicket.reduce(
    //   (acc, ticket) =>
    //     acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
    //   0
    // );

    // const selectedTickets = eventTicket.filter(
    //   (ticket) => count[ticket.Ticket_Id] > 0
    // );

    const totalPrice =
      bookingData?.a1b2 > 0
        ? bookingData?.a1b2 // Use existing totalPrice if available
        : eventTicketDataForCalculations.reduce(
            (acc, ticket) =>
              acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
            0
          );

    const selectedTickets =
      bookingData?.c3d4.length > 0
        ? bookingData?.c3d4
        : eventTicketDataForCalculations.filter(
            (ticket) => count[ticket.Ticket_Id] > 0
          );

    const obj = {
      e5f6: totalTickets,
      a1b2: totalPrice,
      c3d4: selectedTickets,
    };

    dispatch(setBookingDataObj(obj));
  };

  const handleSeasonPass = async () => {
    toast.dismiss();
    const currentEventId = id;

    const totalTicketsInCart = Object.values(count).reduce(
      (acc, num) => acc + num,
      0
    );
    if (currentEventId !== storedEventId && storedEventId !== null) {
      toast.error(
        "You already have tickets from another event. Please clear all tickets before selecting new ones."
      );
      setEventTicket([]);
      return; // Exit the function early
    }

    setIsSeasonpassActive(true);
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_SEASON_PASS}`, payload);
      dispatch(
        setConvenienceFee({
          ConfeeUnit: response.data.data[0].ConfeeUnit,
          ConValue: response.data.data[0].ConValue,
        })
      );
      setEventTicket(response.data.data);
      // dispatch(setTicketData(response.data.data));

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
          setShowTicket(false);
          toast.error(data.message);
        }
      }
    }
    setShowTicket(true);
  };

  const handleContinue = () => {
    calculateTotals();

    dispatch(setTicketCounts(count));
    dispatch(setEventId(id));

    if (bookingDataTicketId === null) {
      dispatch(setTicketId(showTicketId));
    }

    router.push(`/events/tickets/${id}/checkout`);
  };

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
                        <SeasonPass
                          data={data}
                          isSeasonpassActive={isSeasonpassActive}
                        />
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
                      onClick={() => handleShowTicket(ticket.eventDateTime_id)}
                    >
                      <ShortTicket
                        data={ticket}
                        selectedShortTicket={selectedShortTicket}
                      />
                    </div>
                  ))}
                  {data?.SeasonPassCount > 0 && (
                    <div onClick={handleSeasonPass} className="cursor-pointer">
                      <SeasonPass
                        data={data}
                        isSeasonpassActive={isSeasonpassActive}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2 px-4  pt-6 pb-32">
          {bookingData?.c3d4?.length === 0 && eventTicket?.length > 0 && (
            <div>
              <h1 className="md:text-2xl font-bold">Choose ticket:</h1>
              {eventTicket?.map((ticket) => {
                const counts = count[ticket.Ticket_Id] || 0;
                return (
                  <div
                    className="md:h-auto bg-white rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300"
                    key={ticket.Ticket_Id}
                  >
                    <div className="flex gap-4 items-center justify-between px-4 py-4">
                      <div className="flex flex-col gap-2">
                        <p className="md:text-xl capitalize">
                          {ticket.TicketName}
                        </p>
                        {ticket.TicketDescprition && (
                          <p className="md:w-[70%] text-sm md:text-base text-gray-600">
                            {/* {ticket.TicketDescprition} */}
                            {ticket?.TicketDescprition?.split("\n").map(
                              (line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              )
                            )}
                          </p>
                        )}
                        <p className="font-semibold md:text-lg">
                          &#8377; {ticket.TicketPrice}
                        </p>
                      </div>
                      <div>
                        {showCount[ticket.Ticket_Id] ? (
                          <div className="flex justify-center items-center mt-4 ">
                            <button
                              className="bg-blue-900 text-white py-1 px-2 rounded-l"
                              onClick={() =>
                                handleDecreaseandSetEventId(ticket.Ticket_Id)
                              }
                            >
                              -
                            </button>
                            <span className="mx-4">{counts}</span>
                            <button
                              className="bg-blue-900 text-white py-1 px-2 rounded-r"
                              onClick={() =>
                                handleIncreaseandSetEventId(ticket.Ticket_Id)
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
                            } text-white md:py-3 py-2 md:px-6 px-3 rounded mx-auto mt-4`}
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

          {/* if booking data is there is present in localstorage */}

          {bookingData?.c3d4?.length > 0 &&
            eventTicket?.map((ticket) => {
              const counts = count[ticket.Ticket_Id] || 0;
              const isSelectedTicket = bookingData?.c3d4?.find(
                (selected) => selected.Ticket_Id === ticket.Ticket_Id
              );
              return (
                <div
                  className="md:h-auto bg-blue-100 rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300"
                  key={ticket.Ticket_Id}
                >
                  <div className="flex gap-4 items-center justify-between px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <p className="md:text-xl capitalize">
                        {ticket.TicketName}
                      </p>
                      {ticket.TicketDescprition && (
                        <p className="md:w-[70%] text-sm md:text-base text-gray-600">
                          {/* {ticket.TicketDescprition} */}
                          {ticket?.TicketDescprition?.split("\n").map(
                            (line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            )
                          )}
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
                            onClick={() => handleDecrease(ticket.Ticket_Id)}
                          >
                            -
                          </button>
                          <span className="mx-4">{bookingData?.e5f6}</span>
                          <button
                            className="bg-blue-900 text-white py-1 px-2 rounded-r"
                            onClick={() => handleIncrease(ticket.Ticket_Id)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          // className={`${
                          //   isAnyCountActive
                          //     ? "bg-blue-900 bg-opacity-40 cursor-not-allowed"
                          //     : "bg-blue-900"
                          // } text-white py-3 px-6 rounded mx-auto mt-4`}
                          className="bg-blue-900 bg-opacity-40 cursor-not-allowed  text-white py-3 px-6 rounded mx-auto mt-4"
                          // onClick={() => handleShowCount(ticket.Ticket_Id)}
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

        {/* footer */}
        <div className="mt-16">
          {bookingData?.c3d4?.length === 0 && totalTickets > 0 && (
            <div className=" fixed bottom-0 w-[100%] z-50 md:px-20  bg-white shadow-md p-6 flex justify-between items-center">
              <div className="flex flex-col md:gap-2 ">
                <p className="md:text-2xl text-lg font-semibold">
                  ₹ {totalPrice}
                </p>
                <p className="md:text-xl text-lg text-gray-600">
                  {totalTickets} Ticket
                </p>
              </div>
              <div className=" text-right md:flex-row flex-col flex gap-4 ">
                <button
                  onClick={handleContinue}
                  className="bg-blue-900   text-white py-2 px-8 md:px-14  rounded"
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

          {bookingData?.c3d4?.length > 0 && (
            <div className="fixed bottom-0 w-[100%]  md:px-20  bg-white shadow-md p-6 flex justify-between items-center">
              <div className="flex flex-col gap-2 ">
                <p className="md:text-2xl text-lg font-semibold">
                  ₹ {bookingData?.a1b2}
                </p>
                <p className="md:text-xl text-lg text-gray-600">
                  {bookingData?.e5f6} Ticket
                </p>
              </div>
              <div className=" text-right md:flex-row flex-col flex gap-4 ">
                <button
                  onClick={handleContinue}
                  className="bg-blue-900   text-white py-2 px-8 md:px-14 rounded"
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

          {id !== storedEventId && storedEventId !== null && (
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
                  className="bg-blue-900 text-white py-2 px-8 md:px-14  rounded"
                >
                  Continue
                </button>
                <button
                  onClick={clearCart}
                  className="bg-gray-300 text-black py-2 px-8 md:px-14  rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsSlider;
