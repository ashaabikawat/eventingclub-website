import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import booking from "./slices/booking";
import address from "./slices/address";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    // "selectedTickets",
    // "totalTickets",
    "count",
    // "showCount",
    // "ticketData",
    "eventId",
    "promocodeId",
    "ticketId",
    "bookingData",
  ],
};

const persistedReducer = persistReducer(persistConfig, booking);
const persistAddress = persistReducer(persistConfig, address);

const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: persistedReducer,
    address: persistAddress,
  },
});

const persistor = persistStore(store);

export { store, persistor };
