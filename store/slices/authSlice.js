const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  custId: null,
  customerExists: null,
  isLoggedIn: false,
  token: null,
  isNewCustomer: null,
  mobileNumber: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setAuthDetails: (state, action) => {
      const { cust_id, customer_exists } = action.payload;
      (state.custId = cust_id), (state.customerExists = customer_exists);
    },
    setIsNewCustomer: (state, action) => {
      state.isNewCustomer = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    loggedInSucces: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      (state.custId = null),
        (state.customerExists = null),
        (state.isLoggedIn = false),
        (state.token = null),
        (state.isNewCustomer = null),
        (state.mobileNumber = null);
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
} = authSlice.actions;
export default authSlice.reducer;
