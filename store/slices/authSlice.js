import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cust_id: JSON.parse(localStorage.getItem("authToken"))?.cust_id || null,
  customer_exists: null,
  isLoggedIn:
    JSON.parse(localStorage.getItem("authToken"))?.isLoggedIn || false,
  token: JSON.parse(localStorage.getItem("authToken"))?.token || null,
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
      try {
        state.token = action.payload;
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            token: state.token,
            cust_id: state.cust_id,
            isLoggedIn: state.isLoggedIn,
          })
        );
      } catch (error) {
        console.error("Failed to save token to localStorage:", error);
      }
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      // Update localStorage with isLoggedIn state when user logs in
      localStorage.setItem(
        "authToken",
        JSON.stringify({
          token: state.token,
          cust_id: state.cust_id,
          isLoggedIn: true, // Save isLoggedIn as true in localStorage
        })
      );
    },
  },
});

export const { setAuthDetails, setToken, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
