import { encryptData } from "@/utils/constants";
import { createSlice, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// const initialState = {
//   bookingData: {
//     totalPrice: 0,
//     selectedTickets: [],
//     totalTickets: 0,
//   },
//   eventId: null,
//   promocodeId: null,
//   ticketId: null,
//   convenienceFee: {},
//   ticketCounts: {},
//   seasonPass: null,
//   promocodeDiscountAmount: null,
// };

const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

const initialState = {
  z1x0: {
    // bookingData -> z1x0
    a1b2: 0, // totalPrice -> a1b2
    c3d4: [], // selectedTickets -> c3d4
    e5f6: 0, // totalTickets -> e5f6
  },
  g7h8: null, // eventId -> g7h8
  i9j0: null, // promocodeId -> i9j0
  k1l2: null, // ticketId -> k1l2
  m3n4: {}, // convenienceFee -> m3n4
  o5p6: {}, // ticketCounts -> o5p6
  q7r8: null, // seasonPass -> q7r8
  s9t0: null, // promocodeDiscountAmount -> s9t0
};

const bz8v2 = createSlice({
  name: "bz8v2 ",
  initialState,
  reducers: {
    setBookingDataObj: (state, action) => {
      state.z1x0 = action.payload;
      console.log(action.payload);
    },

    setEventId: (state, action) => {
      state.g7h8 = encryptData(action.payload, passphrase);
      // console.log(action.payload);
    },

    // setTicketData: (state, action) => {
    //   state.ticketData = action.payload; // Store fetched ticket data
    // },

    setTicketId: (state, action) => {
      state.k1l2 = encryptData(action.payload, passphrase);
      // console.log(action.payload);
    },

    handleIncrease: (state, action) => {
      toast.dismiss();
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
        state.z1x0.c3d4 = state.z1x0.c3d4?.filter(
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
        state.k1l2 = null;
      }
      if (Object.keys(state.count).length === 0) {
        state.g7h8 = null; // Just nullify the eventId without removing it from localStorage
      }
    },

    setPromocodeId: (state, action) => {
      state.i9j0 = encryptData(action.payload, passphrase);
      // console.log(action.payload);
    },

    remove_promocode: (state, action) => {
      state.i9j0 = null;
    },

    setTicketCounts: (state, action) => {
      state.o5p6 = action.payload;
      console.log(action.payload);
    },
    setSeasonPass: (state, action) => {
      state.q7r8 = action.payload;
      console.log(action.payload);
    },

    setConvenienceFee: (state, action) => {
      state.m3n4 = encryptData(action.payload, passphrase);
      // console.log(action.payload);
    },
    setPromcodeDiscountAmount: (state, action) => {
      state.s9t0 = encryptData(action.payload, passphrase);
      console.log(action.payload);
    },

    reset_state: (state, action) => {
      state.z1x0 = {
        a1b2: 0,
        c3d4: [],
        e5f6: 0,
      };
      state.g7h8 = null;
      state.i9j0 = null;
      state.k1l2 = null;
      state.o5p6 = {};
    },
  },
});

export const {
  setBookingDataObj,
  setTicketId,
  handleIncrease,
  // setTicketData,
  handleDecrease,
  setEventId,
  reset_state,
  remove_promocode,
  setPromocodeId,
  setConvenienceFee,
  setPromcodeDiscountAmount,
  setTicketCounts,
} = bz8v2.actions;
export default bz8v2.reducer;
