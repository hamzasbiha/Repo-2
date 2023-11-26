import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../api/URL";

export const fetchProdcuts = createAsyncThunk("products", async (filters) => {
  // Define the base URL
  let url = `${BaseUrl}/products`;
  // Check if category filter is provided
  if (filters.category) {
    url += `?category=${filters.category}`;
  }
  const res = await axios.get(url);
  return res.data;
});

export const fetchOneProdcut = createAsyncThunk("product/:id", async (id) => {

  const res = await axios.get(`${BaseUrl}/products/${id}`);
  return res.data;
});
export const addProductApi = createAsyncThunk(
  "product/create",
  async ({ token, product }) => {
    const res = await axios.post(
      `${BaseUrl}/products/create`,
      product, // Send the entire product object
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ token, id }) => {

    const res = await axios.delete(`${BaseUrl}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ token, id, product }) => {
    const res = await axios.patch(`${BaseUrl}/products/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState: {
    Product: [],
    SingleProduct: {},
    pending: false,
    error: false,
    loding: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdcuts.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchProdcuts.fulfilled, (state, action) => {
        state.pending = false;

        state.Product = action.payload;
      })
      .addCase(fetchProdcuts.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(addProductApi.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(addProductApi.fulfilled, (state, action) => {
        state.pending = false;
        state.Product = action.payload;
      })
      .addCase(addProductApi.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(fetchOneProdcut.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(fetchOneProdcut.fulfilled, (state, action) => {
        state.pending = false;
        state.SingleProduct = action.payload;
      })
      .addCase(fetchOneProdcut.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.pending = true;
        state.error = false;
        state.loding = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.pending = false;
        state.SingleProduct = action.payload;
        state.error = false;
        state.loding = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.pending = false;
        state.error = false;
        state.loding = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.pending = false;
        state.SingleProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});
export default productSlice.reducer;
