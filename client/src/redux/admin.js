import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "adminDetails",
  initialState: {
    value: {
      isAdminAuth: false,
      bookings: {},
    },
  },
  reducers: {
    adminlogin: (state, action) => {
      state.value = { ...action.payload, isAdminAuth: true };
    },
    adminlogout: (state) => {
      state.value = {
        isAdminAuth: false,
        admin: null,
        bookings: {},
      };
    },
    addBooking: (state, action) => {
      const booking = action.payload;
      state.value.bookings = booking;
    },
  },
});
export const { adminlogin, adminlogout, addBooking } = adminSlice.actions;
export default adminSlice.reducer;
