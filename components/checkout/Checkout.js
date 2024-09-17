import React, { useEffect } from "react";
import Verification from "./verification";
import BookingSummary from "./BookingSummary";
import { useDispatch } from "react-redux";
import { setBookingData } from "@/store/slices/booking";
import { useParams } from "next/navigation";
import InvoiceDetails from "./InvoiceDetails";

const Checkout = ({ bookingData, handleIncrease, handleDecrease }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBookingData({
        selectedTickets: bookingData.selectedTickets,
        eventId: id,
        totalTickets: bookingData.totalTickets,
      })
    );
  }, [bookingData]);

  return (
    <div className="md:py-6 py-4">
      <div className="px-4 md:px-12">
        <h1 className="capitalize md:text-3xl md:mb-8 font-bold">
          Confirm your ticket details and pay
        </h1>
      </div>

      <Verification />
      <BookingSummary
        bookingData={bookingData}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />
      <InvoiceDetails />
    </div>
  );
};

export default Checkout;
