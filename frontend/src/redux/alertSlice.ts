import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
	severity: "error",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
			state.severity = action.payload.severity;

    },
    hideAlert: state => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
