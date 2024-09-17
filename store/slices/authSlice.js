import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cust_id: null,
  customer_exists: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthDetails: (state, action) => {
      const { cust_id, customer_exists } = action.payload;
      state.cust_id = cust_id;
      state.customer_exists = customer_exists;
    },
    setToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
      localStorage.setItem(
        "authToken",
        JSON.stringify({ token: state.token, cust_id: state.cust_id })
      );
    },
  },
});

export const { setAuthDetails, setToken } = authSlice.actions;
export default authSlice.reducer;
