import { createSlice, current } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import toast from "react-hot-toast";

const initialState = {
  selectedTickets: null,
  totalTickets: null,
  ticketData: [],
  count: {},
  showCount: {},
  eventId: null,
};

const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDataObj: (state, action) => {
      const { selectedTickets, totalTickets } = action.payload;
      state.selectedTickets = selectedTickets;
      state.totalTickets = totalTickets;
      // console.log("payload", action.payload);
    },

    setEventId: (state, action) => {
      state.eventId = action.payload;
      console.log(action.payload);
    },
    setTicketData: (state, action) => {
      state.ticketData = action.payload; // Store fetched ticket data
      // console.log("setTicketData", action.payload);
    },

    handleIncrease: (state, action) => {
      const ticketId = action.payload;
      // console.log("increased", ticketId);
      // Find the booking object for the specific ticket

      const bookingObj = current(state.ticketData).find(
        (ticket) => ticket.Ticket_Id === ticketId
      );
      // console.log(bookingObj);

      if (!bookingObj) {
        toast.error("Ticket not found");
        return;
      }

      const bookingLimit = bookingObj.BookingMaxLimit;

      // // Calculate the current count for the ticket
      const currentCount = state.count[ticketId] || 0;

      // // Calculate the total number of tickets including the current increase
      const totalCount = Object.values(state.count).reduce(
        (acc, value) => acc + value,
        0
      );

      if (totalCount > 0 && !state.count[ticketId]) {
        toast.error("You can only select one type of ticket at a time.");
        return;
      }

      // // Check if the new count would exceed the booking limit
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

      // // Update the count and state
      // setCount((prevCount) => ({
      //   ...prevCount,
      //   [ticketId]: (prevCount[ticketId] || 0) + 1,
      // }));

      // // Ensure only the selected ticket shows the counter

      // // Update booking data
      // setBookingData((prevBookingData) => ({
      //   ...prevBookingData,
      //   totalTickets: Object.values(count).map((count) => count),
      // }));
    },

    // handleDecrease: (state, action) => {
    //   const ticketId = action.payload;
    //   const currentCount = state.count[ticketId] || 0;

    //   if (currentCount === 0) {
    //     return state; // No change if the count is already 0
    //   }

    //   const newCount = currentCount - 1;

    //   // If the new count is 0, clear the showCount for that ticketId
    //   if (newCount === 0) {
    //     return {
    //       ...state,
    //       count: {
    //         ...state.count,
    //         [ticketId]: newCount, // Set the count to 0 for the specific ticket
    //       },
    //       showCount: {
    //         ...state.showCount,
    //         [ticketId]: false, // Optionally set to false or remove the entry for this ticketId
    //       },
    //     };
    //   }

    //   return {
    //     ...state,
    //     count: {
    //       ...state.count,
    //       [ticketId]: newCount, // Update the count for the specific ticket
    //     },
    //   };
    // },

    handleDecrease: (state, action) => {
      const ticketId = action.payload;
      const currentCount = state.count[ticketId] || 0;

      if (currentCount === 0) {
        return state; // No change if the count is already 0
      }

      const newCount = currentCount - 1;

      // Create a new count object
      const updatedCount = { ...state.count };

      if (newCount === 0) {
        delete updatedCount[ticketId]; // Remove the ticket from count if count is 0
      } else {
        updatedCount[ticketId] = newCount; // Update the count for the specific ticket
      }

      // Optionally, update showCount
      const updatedShowCount = {
        ...state.showCount,
        ...(newCount === 0 ? { [ticketId]: false } : {}),
      };

      return {
        ...state,
        count: updatedCount,
        showCount: updatedShowCount,
      };
    },

    setShowCount: (state, action) => {
      const ticketId = action.payload;
      return {
        ...state,
        showCount: {
          ...state.showCount,
          [ticketId]: true, // Set showCount for the specific ticketId to true
        },
      };
    },

    reset_state: (state, action) => {
      (state.selectedTickets = null),
        (state.totalTickets = null),
        (state.ticketData = []),
        (state.count = {}),
        (state.showCount = {}),
        (state.eventId = null);
    },
  },
});

export const {
  setBookingDataObj,
  handleIncrease,
  setTicketData,
  handleDecrease,
  setShowCount,
  setEventId,
  reset_state,
} = booking.actions;
export default booking.reducer;
