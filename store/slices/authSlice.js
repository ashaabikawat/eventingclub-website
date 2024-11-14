import { encryptData } from "@/utils/constants";

const { createSlice } = require("@reduxjs/toolkit");

// const initialState = {
//   custId: null,
//   customerExists: null,
//   isLoggedIn: false,
//   token: null,
//   isNewCustomer: null,
//   mobileNumber: null,
// };

const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

const initialState = {
  xA1: encryptData(null, passphrase), // custId
  zX9: encryptData(null, passphrase), // customerExists
  jL3: encryptData(false, passphrase), // isLoggedIn
  pT5: encryptData(null, passphrase), // token
  nQ2: encryptData(null, passphrase), // isNewCustomer
  vY4: encryptData(null, passphrase), // mobileNumber
};

const uSess = createSlice({
  name: "uSess",
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.vY4 = encryptData(action.payload, passphrase);
    },
    setAuthDetails: (state, action) => {
      const { cust_id, customer_exists } = action.payload;
      (state.xA1 = encryptData(cust_id, passphrase)),
        (state.zX9 = encryptData(customer_exists, passphrase));
    },
    setIsNewCustomer: (state, action) => {
      state.nQ2 = encryptData(action.payload, passphrase);
    },
    setToken: (state, action) => {
      state.pT5 = encryptData(action.payload, passphrase);
    },
    loggedInSucces: (state, action) => {
      state.jL3 = encryptData(true, passphrase);
    },
    logout: (state) => {
      (state.xA1 = encryptData(null, passphrase)),
        (state.zX9 = encryptData(null, passphrase)),
        (state.jL3 = encryptData(false, passphrase)),
        (state.pT5 = encryptData(null, passphrase)),
        (state.nQ2 = encryptData(null, passphrase)),
        (state.vY4 = encryptData(null, passphrase));
    },
  },
});

export const {
  setMobileNumber,
  setAuthDetails,
  setIsNewCustomer,
  setToken,
  logout,
  loggedInSucces,
} = uSess.actions;
export default uSess.reducer;
