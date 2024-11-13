const { createSlice } = require("@reduxjs/toolkit");

// const initialState = {
//   custId: null,
//   customerExists: null,
//   isLoggedIn: false,
//   token: null,
//   isNewCustomer: null,
//   mobileNumber: null,
// };

const initialState = {
  xA1: null, // custId
  zX9: null, // customerExists
  jL3: false, // isLoggedIn
  pT5: null, // token
  nQ2: null, // isNewCustomer
  vY4: null, // mobileNumber
};

const uSess = createSlice({
  name: "uSess",
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.vY4 = action.payload;
    },
    setAuthDetails: (state, action) => {
      const { cust_id, customer_exists } = action.payload;
      (state.xA1 = cust_id), (state.zX9 = customer_exists);
    },
    setIsNewCustomer: (state, action) => {
      state.nQ2 = action.payload;
    },
    setToken: (state, action) => {
      state.pT5 = action.payload;
    },
    loggedInSucces: (state, action) => {
      state.jL3 = true;
    },
    logout: (state) => {
      (state.xA1 = null),
        (state.zX9 = null),
        (state.jL3 = false),
        (state.pT5 = null),
        (state.nQ2 = null),
        (state.vY4 = null);
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
