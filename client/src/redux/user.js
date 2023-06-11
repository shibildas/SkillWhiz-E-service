import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    value: {
      isUserAuth: false,
      bookings: {},
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload, isUserAuth: true };
    },
    logout: (state) => {
      state.value = {
        isUserAuth: false,
        user: null,
      };
    },
    addBooking: (state, action) => {
      const booking = action.payload;
      state.value.bookings = booking;
    },
  },
});

export const { login, logout, addBooking } = userSlice.actions;
export default userSlice.reducer;
