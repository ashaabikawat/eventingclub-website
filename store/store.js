import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import booking from "./slices/booking";

const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: booking,
  },
});

export default store;
