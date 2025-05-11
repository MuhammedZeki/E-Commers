import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/CartSlicer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
