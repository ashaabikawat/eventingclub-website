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
} from "../../store/slices/booking";

const TicketsSlider = ({ data, setShowTicket, showTicket }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  const [eventTicket, setEventTicket] = useState([]);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    totalTickets: 0,
    selectedTickets: [],
  });
  const showCount = useSelector((store) => store.booking.showCount);
  const ticketData = useSelector((store) => store.booking.ticketData);
  const count = useSelector((store) => store.booking.count);
  const selectedTickets = useSelector((store) => store.booking.selectedTickets);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(
      setBookingDataObj({
        selectedTickets: bookingData.selectedTickets,
        totalTickets: bookingData.totalTickets,
      })
    );
  }, [bookingData]);

  console.log("count", count);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleShowTicket = async (eventTicketId) => {
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
                <Swiper spaceBetween={2} slidesPerView={2} className="mt-3 ">
                  <SwiperSlide className="p-0">
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
          {showTicket && (
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
                              className="bg-[#666666] text-white py-1 px-2 rounded-l"
                              onClick={() =>
                                dispatch(handleDecrease(ticket.Ticket_Id))
                              }
                            >
                              -
                            </button>
                            <span className="mx-4">{counts}</span>
                            <button
                              className="bg-[#666666] text-white py-1 px-2 rounded-r"
                              onClick={() =>
                                dispatch(handleIncrease(ticket.Ticket_Id))
                              }
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
    </div>
  );
};

export default TicketsSlider;
