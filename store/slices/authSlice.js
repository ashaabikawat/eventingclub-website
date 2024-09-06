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
    setCustId: (state, action) => {
      //   console.log(action.payload);
      state.cust_id = action.payload;
    },
    setCustExists: (state, action) => {
      state.customer_exists = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", JSON.stringify({ token, cust_id }));
    },
  },
});

export const { setCustId, setCustExists, setToken } = authSlice.actions;
export default authSlice.reducer;
