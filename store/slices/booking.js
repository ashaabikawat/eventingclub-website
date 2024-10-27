import { createSlice, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  bookingData: {
    totalPrice: 0,
    selectedTickets: [],
    totalTickets: 0,
  },
  eventId: null,
  promocodeId: null,
  ticketId: null,
  convenienceFee: {},
  ticketCounts: {},
};

const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDataObj: (state, action) => {
      state.bookingData = action.payload;
    },

    reset_bookingData: (state, action) => {
      state.bookingData = {
        selectedTickets: [],
        totalPrice: 0,
        totalTickets: 0,
      };
    },

    setEventId: (state, action) => {
      state.eventId = action.payload;
    },

    setTicketData: (state, action) => {
      state.ticketData = action.payload; // Store fetched ticket data
    },

    setTicketId: (state, action) => {
      state.ticketId = action.payload;
    },

    handleIncrease: (state, action) => {
      const ticketId = action.payload;

      const bookingObj = current(state.ticketData).find(
        (ticket) => ticket.Ticket_Id === ticketId
      );

      if (!bookingObj) {
        toast.error("Ticket not found");
        return;
      }

      const bookingLimit = bookingObj.BookingMaxLimit;

      const currentCount = state.count[ticketId] || 0;

      const totalCount = Object.values(state.count).reduce(
        (acc, value) => acc + value,
        0
      );

      if (totalCount > 0 && !state.count[ticketId]) {
        toast.error("You can only select one type of ticket at a time.");
        return;
      }

      if (currentCount + 1 > bookingLimit || totalCount + 1 > bookingLimit) {
        toast.error("Exceeding booking limit");
        return;
      }

      return {
        ...state,
        count: {
          ...state.count,
          [ticketId]: currentCount + 1, // Increment the count for the specific ticket
        },
      };
    },

    handleDecrease: (state, action) => {
      const ticketId = action.payload;

      // Find the current count of the ticket
      const currentCount = state.count[ticketId] || 0;

      // If the count is greater than 1, decrease the count
      if (currentCount > 1) {
        state.count[ticketId] = currentCount - 1;
      } else if (currentCount === 1) {
        // If the count is 1, reduce it to 0 and remove the ticket from selectedTickets and localStorage
        delete state.count[ticketId];
        delete state.showCount[ticketId]; // Reset showCount for this ticket when the count reaches 0
        setEventId(null);
        setTicketId(null);
        // Remove ticket from selectedTickets
        state.selectedTickets = state.selectedTickets?.filter(
          (ticket) => ticket.Ticket_Id !== ticketId
        );

        // Update localStorage to remove the ticket
        const storedBookingData = localStorage.getItem("bookingData");
        if (storedBookingData && storedBookingData !== "undefined") {
          const parsedBookingData = JSON.parse(storedBookingData);
          const updatedBookingData = parsedBookingData?.filter(
            (ticket) => ticket.Ticket_Id !== ticketId
          );
          localStorage.setItem(
            "bookingData",
            JSON.stringify(updatedBookingData)
          );
        }

        // Set ticketId to null when count reaches 0
        state.ticketId = null;
      }
      if (Object.keys(state.count).length === 0) {
        state.eventId = null; // Just nullify the eventId without removing it from localStorage
      }
    },

    setPromocodeId: (state, action) => {
      state.promocodeId = action.payload;
    },

    remove_promocode: (state, action) => {
      state.promocodeId = null;
    },

    setTicketCounts: (state, action) => {
      state.ticketCounts = action.payload;
    },

    setConvenienceFee: (state, action) => {
      state.convenienceFee = action.payload;
    },

    reset_state: (state, action) => {
      state.bookingData = {
        selectedTickets: [],
      };
      state.eventId = null;
      state.promocodeId = null;
      state.ticketId = null;
      state.ticketCounts = {};
      state.convenienceFee = {};
      // localStorage.setItem("ticketCounts", JSON.stringify({}));
      // localStorage.removeItem("promocodeDiscountAmount");
      // localStorage.removeItem("convenienceFee");
    },
  },
});

export const {
  setBookingDataObj,
  setTicketId,
  handleIncrease,
  setTicketData,
  handleDecrease,
  setEventId,
  reset_state,
  remove_promocode,
  setPromocodeId,
  setConvenienceFee,
  reset_bookingData,
  setTicketCounts,
} = booking.actions;
export default booking.reducer;
