import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import booking from "./slices/booking";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "count",
    "eventId",
    "promocodeId",
    "ticketId",
    "bookingData",
    "ticketCounts",
    "mobileNo",
    "convenienceFee",
  ],
};

const persistedReducer = persistReducer(persistConfig, booking);

const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
