import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../api/URL";

export const fetchclient = createAsyncThunk("admin", async (token) => {
  const res = await axios.get(`${BaseUrl}/users/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    clients: [],
    pending: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchclient.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchclient.fulfilled, (state, action) => {
        state.pending = false;
        state.clients = action.payload;
      })
      .addCase(fetchclient.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
