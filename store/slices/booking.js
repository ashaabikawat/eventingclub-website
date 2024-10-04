import { createSlice, current } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import toast from "react-hot-toast";

const initialState = {
  // selectedTickets: null,
  // totalTickets: null,
  // ticketData: [],
  // count: {},
  // showCount: {},
  bookingData: {
    totalPrice: 0,
    selectedTickets: [],
    totalTickets: 0,
  },
  eventId: null,
  promocodeId: null,
  ticketId: null,
};

const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDataObj: (state, action) => {
      // const { selectedTickets, totalTickets } = action.payload;
      // state.selectedTickets = selectedTickets;
      // state.totalTickets = totalTickets;
      console.log("payload", action.payload);
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
      // console.log(action.payload);
    },

    setTicketData: (state, action) => {
      state.ticketData = action.payload; // Store fetched ticket data
      // console.log("setTicketData", action.payload);
    },

    setTicketId: (state, action) => {
      state.ticketId = action.payload;
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

    //   // Find the current count of the ticket
    //   const currentCount = state.count[ticketId] || 0;

    //   // If the count is greater than 1, decrease the count
    //   if (currentCount > 1) {
    //     state.count[ticketId] = currentCount - 1;
    //   } else if (currentCount === 1) {
    //     // If the count is 1, reduce it to 0 and remove the ticket from localStorage
    //     delete state.count[ticketId];
    //     state.selectedTickets = state.selectedTickets.filter(
    //       (ticket) => ticket.Ticket_Id !== ticketId
    //     );

    //     // Update localStorage to remove the ticket
    //     const storedBookingData = JSON.parse(
    //       localStorage.getItem("bookingData")
    //     );
    //     const updatedBookingData = storedBookingData?.filter(
    //       (ticket) => ticket.Ticket_Id !== ticketId
    //     );
    //     localStorage.setItem("bookingData", JSON.stringify(updatedBookingData));
    //   }
    // },

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

    // handleDecrease: (state, action) => {
    //   const ticketId = action.payload;

    //   // Find the current count of the ticket
    //   const currentCount = state.count[ticketId] || 0;

    //   // If the count is greater than 1, decrease the count
    //   if (currentCount > 1) {
    //     state.count[ticketId] = currentCount - 1;
    //   } else if (currentCount === 1) {
    //     // If the count is 1, reduce it to 0 and remove the ticket from selectedTickets and localStorage
    //     delete state.count[ticketId];
    //     delete state.showCount[ticketId]; // Reset showCount for this ticket when the count reaches 0

    //     // Remove ticket from selectedTickets
    //     state.selectedTickets = state.selectedTickets?.filter(
    //       (ticket) => ticket.Ticket_Id !== ticketId
    //     );

    //     // Update localStorage to remove the ticket
    //     const storedBookingData = localStorage.getItem("bookingData");
    //     if (storedBookingData && storedBookingData !== "undefined") {
    //       const parsedBookingData = JSON.parse(storedBookingData);
    //       const updatedBookingData = parsedBookingData?.filter(
    //         (ticket) => ticket.Ticket_Id !== ticketId
    //       );
    //       localStorage.setItem(
    //         "bookingData",
    //         JSON.stringify(updatedBookingData)
    //       );
    //     }

    //     // Set ticketId to null when count reaches 0
    //     state.ticketId = null;

    //     // Check if all tickets have been removed
    //     const allTicketsRemoved = Object.keys(state.count).length === 0;

    //     if (allTicketsRemoved) {
    //       // Set eventId to null when no tickets are left
    //       state.eventId = null;

    //       // Also remove the eventId from localStorage
    //       const storedEventData = localStorage.getItem("eventData");
    //       if (storedEventData && storedEventData !== "undefined") {
    //         localStorage.removeItem("eventData"); // Clear the event data from localStorage
    //       }
    //     }
    //   }
    // },

    // setShowCount: (state, action) => {
    //   const ticketId = action.payload;
    //   return {
    //     ...state,
    //     showCount: {
    //       ...state.showCount,
    //       [ticketId]: true, // Set showCount for the specific ticketId to true
    //     },
    //   };
    // },

    setShowCount: (state, action) => {
      const ticketId = action.payload;

      // Check if there is already a count for the ticket or if showCount has been initialized
      const currentCount = state.count[ticketId] || 0;

      // Ensure showCount can be updated, even if count is initially empty
      return {
        ...state,
        showCount: {
          ...state.showCount,
          [ticketId]: true, // Always set showCount to true for the clicked ticketId
        },
        count: {
          ...state.count,
          [ticketId]: currentCount, // Initialize the count if it doesn't exist yet
        },
      };
    },

    setPromocodeId: (state, action) => {
      state.promocodeId = action.payload;
      console.log(action.payload);
    },

    reset_state: (state, action) => {
      // (state.selectedTickets = null),
      // (state.totalTickets = null),
      // (state.ticketData = []),
      // (state.count = {}),
      // (state.showCount = {}),
      state.bookingData = {};
      state.eventId = null;
      state.promocodeId = null;
      state.ticketId = null;
    },
  },
});

export const {
  setBookingDataObj,
  setTicketId,
  handleIncrease,
  setTicketData,
  handleDecrease,
  setShowCount,
  setEventId,
  reset_state,
  setPromocodeId,
  reset_bookingData,
} = booking.actions;
export default booking.reducer;
