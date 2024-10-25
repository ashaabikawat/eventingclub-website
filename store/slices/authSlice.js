import { decryptData, encryptData } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

// Utility function to safely parse JSON from localStorage
const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return decryptData(item);
      // const decryptedItem = decryptData(item);
      // return JSON.parse(decryptedItem);
      // return JSON.parse(item);
    } catch (error) {
      console.error(`Failed to parse localStorage item "${key}":, error`);
      return null; // Return null if parsing fails
    }
  }
  return null; // Return null if window is not defined (SSR)
};

const initialState = {
  cust_id: getLocalStorageItem("authToken")?.cust_id || null,
  customer_exists: null,
  isLoggedIn: getLocalStorageItem("authToken")?.isLoggedIn || false,
  token: getLocalStorageItem("authToken")?.token || null,
};

// const saveAuthToLocalStorage = (state) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(
//       "authToken",
//       JSON.stringify({
//         token: state.token,
//         cust_id: state.cust_id,
//         isLoggedIn: state.isLoggedIn,
//         customer_exists: state.customer_exists,
//       })
//     );
//   }
// };
const saveAuthToLocalStorage = (state) => {
  if (typeof window !== "undefined") {
    const encryptedState = encryptData({
      token: state.token,
      cust_id: state.cust_id,
      isLoggedIn: state.isLoggedIn,
      customer_exists: state.customer_exists,
    });
    localStorage.setItem("authToken", encryptedState);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthDetails: (state, action) => {
      const { cust_id, customer_exists } = action.payload;
      state.cust_id = cust_id;
      state.customer_exists = customer_exists;
      saveAuthToLocalStorage(state); // Save updated state to localStorage
    },
    setToken: (state, action) => {
      state.token = action.payload;
      saveAuthToLocalStorage(state); // Save updated state to localStorage
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      saveAuthToLocalStorage(state); // Save updated state to localStorage
    },
    logout: (state) => {
      state.cust_id = null;
      state.customer_exists = null;
      state.isLoggedIn = false;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken"); // Clear token from localStorage
        localStorage.removeItem("mobile");
      }
    },
  },
});

// Exporting actions
export const { setAuthDetails, setToken, loginSuccess, logout } =
  authSlice.actions;
export default authSlice.reducer;
