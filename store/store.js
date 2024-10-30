import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import booking from "./slices/booking";

const bookingPersistConfig = {
  key: "booking",
  storage,
  whitelist: [
    "count",
    "eventId",
    "promocodeId",
    "ticketId",
    "bookingData",
    "ticketCounts",
    "convenienceFee",
  ],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "custId",
    "customerExists",
    "isLoggedIn",
    "token",
    "isNewCustomer",
    "mobileNumber",
  ],
};

const bookingPersistedReducer = persistReducer(bookingPersistConfig, booking);
const authPersistReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: authPersistReducer,
    booking: bookingPersistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
