"use client";
import React, { useEffect, useState } from "react";
import ShortTicket from "./ShortTicket";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { events } from "@/utils/config";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "../checkout/Checkout";
import SeasonPass from "./SeasonPass";
import { useDispatch, useSelector } from "react-redux";
import {
  handleIncrease,
  setTicketData,
  handleDecrease,
  setShowCount,
  setBookingDataObj,
  setEventId,
  reset_state,
  setTicketId,
} from "../../store/slices/booking";

const TicketsSlider = ({ data, setShowTicket, showTicket }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();

  const [selectedShortTicket, setSelectedShortTicket] = useState();

  const [eventTicket, setEventTicket] = useState([]);
  // console.log("eventticket", eventTicket);
  const bookingData = useSelector((store) => store.booking.bookingData);
  // console.log(bookingData);\

  console.log(bookingData?.selectedTickets.length);

  const storedEventId = useSelector((store) => store.booking.eventId);
  // console.log("bookingData", bookingData);
  // const showCount = useSelector((store) => store.booking.showCount);
  const [showCount, setShowCount] = useState(() => {
    const savedShowCount = localStorage.getItem("showCount");
    return savedShowCount ? JSON.parse(savedShowCount) : {};
  });

  console.log("showCount", showCount);

  const ticketData = useSelector((store) => store.booking.ticketData);

  // const [count, setCount] = useState({});
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
  // const selectedTickets = useSelector((store) => store.booking.selectedTickets);
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log(id);
  // console.log(storedEventId);

  // console.log(ticketId);
  useEffect(() => {
    if (storedEventId !== null) {
      // console.log("id", id === storedEventId);
      setEventIdCheck("id", id === storedEventId);
    }
  }, [count, id]);

  // useEffect(() => {
  //   if (bookingData?.selectedTickets?.length > 0) {

  //   }
  // }, [bookingData]);

  useEffect(() => {
    if (ticketId) {
      setShowTicket(true); // Automatically show the ticket section
    }
  }, [ticketId]);

  // console.log("count", count);

  const handleIncreaseandSetEventId = (ticketId) => {
    // console.log(ticketId);

    const bookingObj = eventTicket?.find(
      (ticket) => ticket.Ticket_Id === ticketId
    );

    const bookingLimit = bookingObj.BookingMaxLimit;

    if (bookingData.selectedTickets.length === 0) {
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
        localStorage.setItem("showCount", JSON.stringify(updatedShowCount));
      } else {
        // alert("Exceeding booking limit");
        toast.error("Exceeding booking limit");
      }
      setFinalBookingData;
      ({ ...finalBookingData, totalTickets: Number(Object.values(count)) });
    } else {
    }

    // Ensure only the selected ticket shows the counter
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

      // Save updated counts and showCount in localStorage
      localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
      localStorage.setItem("showCount", JSON.stringify(updatedShowCount));

      // Update final booking data (if necessary)
      setFinalBookingData((prevData) => ({
        ...prevData,
        totalTickets: Object.values(updatedCounts).reduce(
          (acc, value) => acc + value,
          0
        ),
      }));

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
    dispatch(setTicketId(eventTicketId));

    const currentEventId = id; // The event ID from the URL or route params
    const storedEventData = JSON.parse(localStorage.getItem("eventData"));

    if (storedEventData && storedEventData.eventId !== currentEventId) {
      toast.error(
        "You already have tickets for another event. Please clear your cart before selecting tickets for this event."
      );
      setShowTicket(false);
      return;
    }

    const payload = {
      event_id: currentEventId,
      eventDateTime_id: eventTicketId,
    };

    try {
      const response = await axios.post(`${events.GET_TICKETS_BY_ID}`, payload);
      setEventTicket(response.data.data);

      // Update showCount in localStorage
      const updatedShowCount = { ...showCount, [eventTicketId]: true };
      setShowCount(updatedShowCount);
      localStorage.setItem("showCount", JSON.stringify(updatedShowCount));

      setShowTicket(true);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        setShowTicket(false);
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (bookingData) {
      setFinalBookingData((prevBookingData) => ({
        ...prevBookingData,
        totalTickets: Object.values(count).reduce((acc, num) => acc + num, 0),
        totalPrice: eventTicket.reduce(
          (acc, ticket) => acc + (count[ticket._id] || 0) * ticket.Price,
          0
        ),
      }));
    }
  }, [count]);

  console.log("finalbooking", finalBookingData);

  useEffect(() => {
    if (finalBookingData?.totalTickets > 0) {
      dispatch(setBookingDataObj({ ...finalBookingData }));
    }
  }, [finalBookingData]);

  //   // console.log("increase", ticketId);

  const handleShowCount = (ticketId) => {
    // console.log("handleShow", ticketId);
    // dispatch(setShowCount(ticketId));
    // dispatch(setEventId(id));

    setShowCount((prevShowCount) => ({
      ...prevShowCount,
      [ticketId]: true,
    }));
  };

  const totalTickets = Object.values(count).reduce(
    (acc, count) => acc + count,
    0
  );

  const totalPrice = eventTicket.reduce(
    (acc, ticket) => acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
    0
  );

  const calculateTotals = () => {
    const totalTickets = Object.values(count).reduce(
      (acc, count) => acc + count,
      0
    );
    const totalPrice = eventTicket.reduce(
      (acc, ticket) =>
        acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
      0
    );

    const selectedTickets = eventTicket.filter(
      (ticket) => count[ticket.Ticket_Id] > 0
    );
    // console.log("selectedtickets", selectedTickets);

    // setBookingData({
    //   totalPrice,
    //   totalTickets,
    //   selectedTickets,
    // });

    const data = { totalPrice, totalTickets, selectedTickets };
    setFinalBookingData(data);
  };

  // console.log("outside", finalBookingData);

  const handleContinue = () => {
    calculateTotals();

    // console.log("inside", finalBookingData);

    // dispatch(setBookingDataObj({ finalBookingData }));

    dispatch(setEventId(id));
    router.push(`/events/tickets/${id}/checkout`);
  };

  const handleSeasonPass = async () => {
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_SEASON_PASS}`, payload);
      console.log("data", response.data.data[0].Ticket_Id);
      dispatch(setTicketData(response.data.data));
      setSelectedShortTicket(response.data.data[0].Ticket_Id);
      dispatch(setTicketId(response.data.data[0].Ticket_Id));
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

  // if (!storedEventData) {
  //   toast.error("You already have tickets of another event");
  // }

  const isAnyCountActive = Object.values(showCount).some((value) => value);

  console.log("count", count);
  return (
    <>
      <div className="bg-gray-50 md:py-10">
        <Toaster />

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
                  <Swiper
                    className="mt-4"
                    spaceBetween={6}
                    slidesPerView={1}
                    breakpoints={{
                      320: {
                        slidesPerView: 3,
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
                      // 768: {
                      //   slidesPerView: 3,
                      //   spaceBetween: 20,
                      // },
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

                    {data?.DateTimeDate.length > 1 && (
                      <SwiperSlide>
                        <div
                          onClick={() => handleSeasonPass()}
                          className="cursor"
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
                    {data?.DateTimeDate.length > 1 && (
                      <div
                        onClick={() => handleSeasonPass()}
                        className="cursor"
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

          <div className=" mt-2 px-4 md:px-14 py-6">
            {(eventIdCheck === null || eventIdCheck) &&
            showTicket &&
            ticketId !== null &&
            eventTicket?.length > 0 &&
            bookingData?.selectedTickets.length === 0 ? (
              <div>
                <h1 className="md:text-2xl   font-bold">Choose ticket:</h1>
                {eventTicket?.map((ticket) => {
                  const counts = count[ticket.Ticket_Id] || 0;
                  {
                    // console.log(counts);
                  }
                  return (
                    <div
                      className=" md:h-auto bg-white rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300"
                      key={ticket.Ticket_Id}
                    >
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
                          <p className="font-semibold md:text-lg">
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
                                className="bg-blue-900 text-white py-1 px-2 rounded-l"
                                // onClick={() =>
                                //   dispatch(handleDecrease(ticket.Ticket_Id))
                                // }
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
                              className={` ${
                                isAnyCountActive
                                  ? "bg-blue-900 bg-opacity-40 cursor-not-allowed"
                                  : "bg-blue-900"
                              }   text-white py-3 px-6 rounded mx-auto mt-4`}
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
            ) : (
              <div>
                <h1 className="md:text-2xl font-bold">Choose ticket:</h1>
                {eventTicket?.map((ticket) => {
                  const counts = count[ticket.Ticket_Id] || 0;
                  const isSelectedTicket = bookingData?.selectedTickets.find(
                    (selected) => selected.Ticket_Id === ticket.Ticket_Id
                  );

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
                          {/* If the ticket is selected, show the quantity counter */}
                          {isSelectedTicket ? (
                            <div className="flex justify-center items-center mt-4">
                              <button
                                className="bg-blue-900 text-white py-1 px-2 rounded-l"
                                onClick={() =>
                                  handleDecreaseandSetEventId(ticket.Ticket_Id)
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
                              } text-white py-3 px-6 rounded mx-auto mt-4`}
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

          {storedEventId !== null && storedEventId !== id && (
            <div className="flex items-center justify-center">
              <button
                onClick={() => dispatch(reset_state())}
                className="bg-[#666666] w-[20%] text-white py-4 px-4 rounded fixed bottom-0 "
              >
                Clear
              </button>
            </div>
          )}
        </>
      </div>
      <>
        {totalTickets > 0 && bookingData?.totalTickets === 0 ? (
          <div className="relative md:px-20  bg-white shadow-md p-6 flex justify-between items-center">
            <div className="flex flex-col gap-2 ">
              <p className="md:text-2xl text-lg font-semibold">
                ₹ {totalPrice}
              </p>
              <p className="md:text-xl text-lg text-gray-600">
                {totalTickets} Ticket
              </p>
            </div>
            <div className=" text-right ">
              <button
                onClick={handleContinue}
                className="bg-blue-900   text-white py-2 px-14 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="relative md:px-20  bg-white shadow-md p-6 flex justify-between items-center">
            <div className="flex flex-col gap-2 ">
              <p className="md:text-2xl text-lg font-semibold">
                ₹ {bookingData?.totalPrice}
              </p>
              <p className="md:text-xl text-lg text-gray-600">
                {bookingData?.totalTickets} Ticket
              </p>
            </div>
            <div className=" text-right ">
              <button
                onClick={handleContinue}
                className="bg-blue-900   text-white py-2 px-14 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default TicketsSlider;
