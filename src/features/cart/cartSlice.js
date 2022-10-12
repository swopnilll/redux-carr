import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartItemsUrl = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (payload, thunkApi) => {
    // console.log(payload);
    // console.log(thunkApi);
    // console.log(thunkApi.getState());
    // console.log(thunkApi.dispatch(openModal()))

    try {
      const response = await axios.get(cartItemsUrl);

      return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue("Request is not fulfliled")
    }
  }
);

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
        (item) => item.id === payload.id
      );

      selectedItem.amount = selectedItem.amount + 1;
    },

    decrementAmount: (state, { payload }) => {
      const selectedItem = state.cartItems.find(
        (item) => item.id === payload.id
      );

      selectedItem.amount = selectedItem.amount - 1;
    },

    calculateTotal: (state) => {
      let totalCost = 0;
      let totalCartAmount = 0;

      state.cartItems.forEach((item) => {
        totalCartAmount = totalCartAmount + item.amount;

        totalCost = totalCost + item.amount * item.price;
      });

      state.amount = totalCartAmount;
      state.total = totalCost.toFixed(2);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action)
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItemFromCart,
  incrementAmount,
  decrementAmount,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
