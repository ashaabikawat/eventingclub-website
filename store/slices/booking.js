import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const initialState = {
  selectedTickets: null,
  eventId: null,
  totalTickets: null,
};

const booking = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      const { selectedTickets, eventId, totalTickets } = action.payload;
      state.selectedTickets = selectedTickets;
      state.eventId = eventId;
      state.totalTickets = totalTickets;
    },
  },
});

export const { setBookingData } = booking.actions;
export default booking.reducer;
