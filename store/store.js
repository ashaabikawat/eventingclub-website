import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import uSess from "./slices/authSlice";
import bz8v2 from "./slices/booking";

const bookingPersistConfig = {
  key: "bz8v2",
  storage,
  whitelist: [
    "count",
    "g7h8",
    "i9j0",
    "k1l2",
    "z1x0",
    "o5p6",
    "m3n4",
    "s9t0",
    "q7r8",
  ],
};

const authPersistConfig = {
  key: "uSess",
  storage,
  whitelist: ["xA1", "zX9", "jL3", "pT5", "nQ2", "vY4"],
};

const bookingPersistedReducer = persistReducer(bookingPersistConfig, bz8v2);
const authPersistReducer = persistReducer(authPersistConfig, uSess);

const store = configureStore({
  reducer: {
    uSess: authPersistReducer,
    bz8v2: bookingPersistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
