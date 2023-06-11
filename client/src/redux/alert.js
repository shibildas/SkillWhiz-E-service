import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  message: "",
  icon: "",
  show: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.icon = action.payload.icon;
      state.show = true;
    },
    clearAlert: (state) => {
      state.type = "";
      state.message = "";
      (state.icon = ""), (state.show = false);
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
