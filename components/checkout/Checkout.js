import React, { useEffect } from "react";
import Verification from "./verification";
import BookingSummary from "./BookingSummary";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData } from "@/store/slices/booking";
import { useParams } from "next/navigation";
import InvoiceDetails from "./InvoiceDetails";
import { handleIncrease, handleDecrease } from "../../store/slices/booking";

const Checkout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const selectedTicket = useSelector((store) => store.booking.selectedTickets);
  const totalTickets = useSelector((store) => store.booking.totalTickets);
  const count = useSelector((store) => store.booking.count);
  // console.log("count", count);

  // useEffect(() => {
  //   dispatch(
  //     setBookingData({
  //       selectedTickets: bookingData.selectedTickets,
  //       eventId: id,
  //       totalTickets: bookingData.totalTickets,
  //     })
  //   );
  // }, [bookingData]);

  return (
    <div className="md:py-6 py-4">
      <div className="px-4 md:px-12">
        <h1 className="capitalize md:text-3xl md:mb-8 font-bold">
          Confirm your ticket details and pay
        </h1>
      </div>

      {/* <Verification /> */}
      <BookingSummary
      // bookingData={bookingData}
      />
      {/* <InvoiceDetails /> */}
    </div>
  );
};

export default Checkout;
