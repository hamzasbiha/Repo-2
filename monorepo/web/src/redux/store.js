import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose the storage library you want
import cartSlice from "./cartSlice";
import ClientSlice from "./client/ClientSlice";
import productSlice from "./products/productSlice";
import alertSlice from "./Alert/AlertSlice";
import filterSlice from "./filtres/filterSlice";
import adminSlice from "./admin/adminSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "client", "user"],
};

const rootReducer = combineReducers({
  cart: cartSlice,
  user: ClientSlice,
  product: productSlice,
  alert: alertSlice,
  filter: filterSlice,
  admin: adminSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
