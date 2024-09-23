const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  stateIsoCode: null,
  stateName: null,
  cityIsoCode: null,
  cityName: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.stateIsoCode = action.payload.stateIsoCode;
      state.stateName = action.payload.stateName;
      state.cityIsoCode = action.payload.cityIsoCode;
      state.cityName = action.payload.cityName;

      // Save the updated state to localStorage
      localStorage.setItem("address", JSON.stringify(state));
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
