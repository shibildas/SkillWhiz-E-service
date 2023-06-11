import { createSlice } from "@reduxjs/toolkit";

export const expertSlice = createSlice({
  name: "expertDetails",
  initialState: {
    value: {
      isExpertAuth: false,
      bookings: {},
    },
  },
  reducers: {
    expertlogin: (state, action) => {
      state.value = { ...action.payload, isExpertAuth: true };
    },
    expertlogout: (state) => {
      state.value = {
        isExpertAuth: false,
        expert: null,
        bookings: {},
      };
    },
    addBooking: (state, action) => {
      const booking = action.payload;
      state.value.bookings = booking;
    },
  },
});
export const { expertlogin, expertlogout, addBooking } = expertSlice.actions;
export default expertSlice.reducer;
