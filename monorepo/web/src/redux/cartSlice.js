import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../api/URL";

export const addCartApi = createAsyncThunk("cart", async ({ info, token }) => {
  console.log(info);
  const res = await axios.post(`${BaseUrl}/cart/create`, info, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const fetchallcart = createAsyncThunk("carts", async (token) => {
  const res = await axios.get(`http://localhost:3008/cart/carts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data);
  return res.data;
});
export const fetchOrderClient = createAsyncThunk(
  "orders",
  async ({ id, token }) => {
    const res = await axios.get(`http://localhost:3008/cart/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);
export const fetchUserCart = createAsyncThunk("carts", async (id) => {
  const res = await axios.get(`http://localhost:3008/cart/${id}`);
  return res.data;
});
export const deletecart = createAsyncThunk("cart/delete", async ({ id }) => {
  const res = await axios.delete(`${BaseUrl}/cart/delete/${id}`);
  return res.data;
});
export const updatecart = createAsyncThunk(
  "cart/update",
  async ({ token, id, inputs }) => {
    const res = await axios.patch(`${BaseUrl}/cart/update/${id}`, inputs, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const fetchSingleCart = createAsyncThunk(
  "cart/fetchone",
  async ({ id, token }) => {
    const res = await axios.get(`${BaseUrl}/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    orders: [],
    currentUserOrder: [],
    currentUserCart: [],
    pending: false,
    error: false,
    loding: false,
  },

  reducers: {
    addtocart: (state, action) => {
      const item = state.cart?.find((item) => item.id === action.payload.id);
      if (item) {
        // Check if adding the quantity doesn't exceed the available stock
        if (item.QTE + action.payload.QTE <= item.stock) {
          item.QTE += action.payload.QTE;
        } else {
          console.log("Stock is limited for this item");
        }
      } else {
        state.cart.push(action.payload);
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, QTE } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.QTE = QTE;
      }
    },
    removeAllFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const indexOfItemToRemove = state.findIndex(
        (item) => item.id === itemIdToRemove
      );
      if (indexOfItemToRemove !== -1) {
        // If the item is found, remove it from the state
        state.cart.splice(indexOfItemToRemove, 1);
      }
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    restCart: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleCart.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchSingleCart.fulfilled, (state, action) => {
        state.pending = false;
        state.currentUserCart = action.payload;
      })
      .addCase(fetchSingleCart.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(fetchallcart.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchallcart.fulfilled, (state, action) => {
        console.log(state.orders);
        state.pending = false;
        state.orders = action.payload;
      })
      .addCase(fetchallcart.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(fetchOrderClient.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchOrderClient.fulfilled, (state, action) => {
        state.pending = false;
        state.currentUserOrder = action.payload;
      })
      .addCase(fetchOrderClient.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const {
  addtocart,
  restCart,
  removeAllFromCart,
  removeItemFromCart,
  updateCartItemQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
