import { createSlice } from "@reduxjs/toolkit";

import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItemFromCart: (state, action) => {
      const itemId = action?.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    incrementAmount: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (item) => (item.id === payload.id)
      );

      selectedItem.amount = selectedItem.amount + 1;
    },

    decrementAmount: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (item) => (item.id === payload.id)
      );

      selectedItem.amount = selectedItem.amount - 1;
    },

    calculateTotal: (state) => {
      let totalCost = 0;
      let totalCartAmount = 0;

      state.cartItems.forEach(item => {
        totalCartAmount = totalCartAmount + item.amount;

        totalCost = totalCost + (item.amount * item.price);
      })

      state.amount = totalCartAmount;
      state.total = totalCost.toFixed(2);
    }
  },
});

export const { clearCart, removeItemFromCart, incrementAmount, decrementAmount, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;
