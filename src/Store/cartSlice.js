import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserEmail, getCurrentUserToken } from "../Auth";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// Async thunks for fetching and updating cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const userEmail = getCurrentUserEmail();
    const token = getCurrentUserToken();
    const response = await axios.get(`http://localhost:8082/user/cart/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productIds }) => {
    const userEmail = getCurrentUserEmail();
    const token = getCurrentUserToken();
    const response = await axios.patch(
      `/user/cart/${userEmail}`,
      productIds,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
    addToCart(state, action) {
      const { product } = action.payload;
      const existingItem = state.cartItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.cartQuantity++;
      } else {
        state.cartItems.push({ product, cartQuantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const { productId } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.product.id === productId);

      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
   
    changeCartItemQuantity(state, action) {
      const { productId, increment } = action.payload;
      const item = state.cartItems.find((item) => item.product.id === productId);
    
      if (item) {
        const availableQuantity = item.product.quantity; // Access product quantity from cart item
        if (increment) {
          item.cartQuantity = Math.min(item.cartQuantity + 1, availableQuantity);
        } else {
          item.cartQuantity = Math.max(item.cartQuantity - 1, 1);
        }
      }
    },
    
    


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.map(product => ({
          product,
          cartQuantity: 1 // Set initial cartQuantity to 1 for each product
        }));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  },
});

export const { clearCart, addToCart,removeFromCart,changeCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
