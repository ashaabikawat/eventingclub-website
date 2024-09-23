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
} from "../../store/slices/booking";

const TicketsSlider = ({ data, setShowTicket, showTicket }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  // console.log("data", data);

  const [eventTicket, setEventTicket] = useState([]);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    totalTickets: 0,
    selectedTickets: [],
  });

  const storedEventId = useSelector((store) => store.booking.eventId);
  // console.log("bookingData", bookingData);
  const showCount = useSelector((store) => store.booking.showCount);
  const ticketData = useSelector((store) => store.booking.ticketData);
  const count = useSelector((store) => store.booking.count);
  // const selectedTickets = useSelector((store) => store.booking.selectedTickets);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (bookingData.selectedTickets.length > 0) {
      dispatch(
        setBookingDataObj({
          selectedTickets: bookingData.selectedTickets,
          totalTickets: bookingData.totalTickets,
        })
      );
    }
  }, [bookingData]);

  // console.log("count", count);

  const handleIncreaseandSetEventId = (ticketId) => {
    dispatch(handleIncrease(ticketId));
    dispatch(setEventId(id));
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
    const currentEventId = id;

    const totalTicketsInCart = Object.values(count).reduce(
      (acc, num) => acc + num,
      0
    );

    if (totalTicketsInCart > 0 && storedEventId !== currentEventId) {
      // Show a message that tickets from another event are already in the cart
      toast.error(
        "You already have tickets from another event. Please clear all tickets before selecting new ones."
      );
      return; // Exit the function early
    }

    const payload = {
      event_id: id,
      eventDateTime_id: eventTicketId,
    };

    try {
      const response = await axios.post(`${events.GET_TICKETS_BY_ID}`, payload);
      // console.log(response.data.data);
      // setTicketData(response.data.data);
      dispatch(setTicketData(response.data.data));
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
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      totalTickets: Object.values(count).reduce((acc, num) => acc + num, 0),
      totalPrice: eventTicket.reduce(
        (acc, ticket) => acc + (count[ticket._id] || 0) * ticket.Price,
        0
      ),
    }));
  }, [count]);

  //   // console.log("increase", ticketId);

  const handleShowCount = (ticketId) => {
    // console.log("handleShow", ticketId);
    dispatch(setShowCount(ticketId));
    // setShowCount((prevShowCount) => ({
    //   ...prevShowCount,
    //   [ticketId]: true,
    // }));
  };

  const totalTickets = Object.values(count).reduce(
    (acc, count) => acc + count,
    0
  );
  const totalPrice = ticketData.reduce(
    (acc, ticket) => acc + (count[ticket.Ticket_Id] || 0) * ticket.TicketPrice,
    0
  );

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

  const handleContinue = () => {
    calculateTotals();
    dispatch(setEventId(id));
    router.push(`/events/tickets/${id}/checkout`);
  };

  const handleSeasonPass = async () => {
    const payload = {
      event_id: id,
    };
    try {
      const response = await axios.post(`${events.GET_SEASON_PASS}`, payload);
      // console.log("data", response.data.data);
      dispatch(setTicketData(response.data.data));
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

  const isAnyCountActive = Object.values(showCount).some((value) => value);

  return (
    <div>
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
                      slidesPerView: 2.6,
                      spaceBetween: 20,
                    },
                    425: {
                      slidesPerView: 5.3,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 6.3,
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
                        <ShortTicket data={ticket} />
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
                          className="border border-gray-500 bg-gray-200 flex items-center justify-start gap-5 flex-col rounded-md px-4 py-2
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
                      <ShortTicket data={ticket} />
                    </div>
                  ))}
                  {data?.DateTimeDate.length > 1 && (
                    <div onClick={() => handleSeasonPass()} className="cursor">
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
                          data?.DateTimeDate[data.DateTimeDate.length - 1].Date
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
          {showTicket && ticketData?.length > 0 && (
            <div>
              <h1 className="md:text-2xl   font-bold">Choose ticket</h1>
              {ticketData?.map((ticket) => {
                const counts = count[ticket.Ticket_Id] || 0;
                {
                  /* console.log(counts); */
                }
                return (
                  <div
                    className=" md:h-auto  rounded-md md:mt-6 mt-6 md:w-full md:mb-4 border border-gray-300"
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
                              className="bg-blue-900 text-white py-1 px-2 rounded-l"
                              onClick={() =>
                                dispatch(handleDecrease(ticket.Ticket_Id))
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

        <>
          {storedEventId === id && totalTickets > 0 && (
            <div className="fixed bottom-0 w-[100%] h-[100px] bg-white shadow-md p-6 flex justify-between items-center">
              <div className="w-[50%] ">
                <p className="md:text-2xl text-lg font-bold">Rs.{totalPrice}</p>
                <p className="md:text-xl text-lg font-bold">
                  {totalTickets} Ticket
                </p>
              </div>
              <div className="w-[100%] text-right ">
                <button
                  onClick={handleContinue}
                  className="bg-blue-900 md:w-[50%] text-white py-2 px-4 rounded"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </>

        {storedEventId !== null && storedEventId !== id && (
          <div className="flex items-center justify-center">
            <button
              onClick={() => dispatch(reset_state())}
              className="bg-[#666666] w-[20%] text-white py-2 px-4 rounded fixed bottom-0 "
            >
              Clear
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default TicketsSlider;
