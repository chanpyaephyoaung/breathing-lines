import { createSlice } from "@reduxjs/toolkit";

// Use localstorage user account info if there is, else then null
const userAccInfo = localStorage.getItem("userAccInfo")
   ? JSON.parse(localStorage.getItem("userAccInfo"))
   : null;

const initialState = {
   userAccInfo,
};

const authUserSlice = createSlice({
   name: "authUser",
   initialState,
   reducers: {
      setSignInDetails: (state, action) => {
         const payloadDetails = action.payload;
         state.userAccInfo = payloadDetails;

         // Store in local storage
         localStorage.setItem("userAccInfo", JSON.stringify(payloadDetails));
      },
      removeSignInDetails: (state) => {
         // Remove user account info from localstorage
         state.userAccInfo = null;
         localStorage.removeItem("userAccInfo");
      },
   },
});

export const { setSignInDetails, removeSignInDetails } = authUserSlice.actions;

export default authUserSlice.reducer;
