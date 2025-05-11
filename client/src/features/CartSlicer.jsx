import { createSlice } from "@reduxjs/toolkit";

const getFromLocalStorageToCartProducts = () => {
  if (localStorage.getItem("cartItems")) {
    return JSON.parse(localStorage.getItem("cartItems"));
  }
  return [];
};
const initialState = {
  cartItems: getFromLocalStorageToCartProducts(),
};

const writeFromLocalStorageToCartProducts = (getAction) => {
  localStorage.setItem("cartItems", JSON.stringify(getAction));
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const isBasket = state.cartItems.find((item) => item._id === product._id);
      if (isBasket) {
        isBasket.quantity += quantity;
      } else {
        state.cartItems = [...state.cartItems, { ...product, quantity }];
      }
      writeFromLocalStorageToCartProducts(state.cartItems);
    },
    removeToCart: (state, action) => {
      state.cartItems = [
        ...state.cartItems.filter((item) => item._id !== action.payload),
      ];
      writeFromLocalStorageToCartProducts(state.cartItems);
    },
    applyDiscount: (state, action) => {
      const { discountPercent } = action.payload;
      const discountRate = Number(discountPercent);
      if (isNaN(discountRate)) return; // Geçersiz oran varsa işlemi durdur

      state.cartItems = state.cartItems.map((item) => {
        const price = Number(item.price); // price zaten number olmalı ama yine de kontrol
        const discountedPrice = price * (1 - discountRate / 100);

        return {
          ...item,
          price: Number(discountedPrice.toFixed(2)),
        };
      });

      writeFromLocalStorageToCartProducts(state.cartItems);
    },
    resetProducts: (state) => {
      state.cartItems = [];
      writeFromLocalStorageToCartProducts(state.cartItems);
    },
  },
});
export const { addToCart, removeToCart, applyDiscount, resetProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
