import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../api/URL";
// Define your async thunks
export const fetchUserApi = createAsyncThunk("user", async (token) => {
  const res = await axios.get(`${BaseUrl}/users/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
});
export const updateUser = createAsyncThunk(
  "update/user",
  async ({ token, user, password }) => {
    console.log(token);
    console.log(user);
    console.log(password);
    const res = await axios.patch(
      `${BaseUrl}/users`,
      { user, password }, // Separate the password from the user object
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res.data);
    return res.data;
  }
);

export const updatPassword = createAsyncThunk(
  "update-password",
  async ({ token, user }) => {
    console.log(token);
    const res = await axios.patch(`${BaseUrl}/users/update-password`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    return res.data;
  }
);
export const deleteUser = createAsyncThunk(
  "delete/user",
  async ({ id, token }) => {
    const res = await axios.delete(`${BaseUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
export const forgetPassword = createAsyncThunk("forget", async ({ email }) => {
  const res = await axios.post(`${BaseUrl}/api/auth/forget-Password`, {
    email,
  });
  console.log(res);
  return res.data;
});
export const RestPassword = createAsyncThunk(
  "restPassword",
  async ({ token, password }) => {
    console.log(token);
    const res = await axios.patch(
      `${BaseUrl}/api/auth/reset-password`,
      { password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);
export const verifcation = createAsyncThunk("verify", async (token) => {
  const res = await axios.get(`${BaseUrl}/users/verfication`, {
    headers: { Authorization: `Bearer ${token}` },
  });
});
export const verifyAccounte = createAsyncThunk(
  "verify/accounte",
  async ({ VN, token }) => {
    console.log(VN);
    const res = await axios.post(
      `${BaseUrl}/users/verify-you-accounte`,
      { VN: VN },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
);
export const deleteAccoute = createAsyncThunk(
  "deleteAccount",
  async ({ token, password }) => {
    console.log(token);
    console.log(password);
    const res = await axios.delete(`${BaseUrl}/users/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  }
);
const clientSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    pending: false,
    error: false,
  },
  reducers: {
    logout: (state, action) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserApi.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchUserApi.fulfilled, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      .addCase(fetchUserApi.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(verifcation.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(verifcation.fulfilled, (state) => {
        state.pending = false;
        state.error = false;
      })
      .addCase(verifcation.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(verifyAccounte.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(verifyAccounte.fulfilled, (state, action) => {
        state.pending = false;
        state.error = false;
      })
      .addCase(verifyAccounte.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(deleteAccoute.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(deleteAccoute.fulfilled, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      .addCase(deleteAccoute.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { fetchUser, fetchUserSuccess, fetchUserError, logout } =
  clientSlice.actions;
export default clientSlice.reducer;
