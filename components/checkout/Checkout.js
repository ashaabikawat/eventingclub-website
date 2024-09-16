import React, { useEffect } from "react";
import Verification from "./verification";
import BookingSummary from "./BookingSummary";
import { useDispatch } from "react-redux";
import { setBookingData } from "@/store/slices/booking";
import { useParams } from "next/navigation";

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
    <div>
      {/* <Verification /> */}
      <BookingSummary
        bookingData={bookingData}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />
    </div>
  );
};

export default Checkout;
