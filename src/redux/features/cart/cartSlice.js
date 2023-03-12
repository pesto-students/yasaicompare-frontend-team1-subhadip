import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api";

const initialState = {
  data: [],
  error: null,
  asyncStatus: "INIT",
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (payload, thunkApi) => {
    try {
      const response = await api.getCartItems(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Add to Cart

export const addCartItem = createAsyncThunk(
  "cart/addToCart",
  async (
    payload = {
      shop_id: "",
      item_id: "",
      quantity: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.addToCart(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Update the cart item quantity

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    payload = {
      shop_id: "",
      item_id: "",
      quantity: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.updateCartItem(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Delete the cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (
    payload = {
      shop_id: "",
      item_id: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.deleteCartItem(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload.cart;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });

    builder
      .addCase(addCartItem.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = [...state.data, action.payload];
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });

    builder
      .addCase(updateCartItem.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        const idx = state.data.findIndex(
          (item) => item.cart_id === action.payload.cart_id
        );
        if (idx !== -1) {
          state.data[idx] = action.payload;
        } else {
          state.data = [action.payload];
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });

    builder
      .addCase(deleteCartItem.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        const idx = state.data.findIndex(
          (item) => item.cart_id === action.meta.arg.cart_id
        );
        if (idx !== -1) {
          state.data.splice(idx, 1);
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
  },
});

export default cartSlice.reducer;
