import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: [],
    price: {
      minPrice: 0,
      maxPrice: 0,
    },
    sortOption: "",
  },
  reducers: {
    filterPrice: (state, action) => {
      state.price = action.payload;
    },
    filterMarket: (state, action) => {
      state.filters = action.payload;
    },
    sortby: (state, action) => {
      console.log(action.payload);
      console.log(state.sortOption);
      state.sortOption = action.payload;
    },
    resetFilter: (state) => {
      state.typeFood = [];
      state.filters = [];
      state.price = {
        minPrice: 0,
        maxPrice: 0,
      };
    },
  },
});

export const { filterMarket, filterPrice, filterType, resetFilter, sortby } =
  filterSlice.actions;
export default filterSlice.reducer;
