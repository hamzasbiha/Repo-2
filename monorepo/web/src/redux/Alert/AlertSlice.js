import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    messsage: "",
    typeMessage: "",
    showdrawer: false,
  },
  reducers: {
    showDrawer: (state, action) => {
      state.showdrawer = action.payload;
    },
    hideDrawer: (state, action) => {
      state.showdrawer = action.payload;
    },
  },
});

export const { showAlert, hideAlert, showDrawer, hideDrawer } =
  alertSlice.actions;
export default alertSlice.reducer;
