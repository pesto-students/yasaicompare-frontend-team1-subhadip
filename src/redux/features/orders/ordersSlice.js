import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api";

const initialState = {
  data: [],
  error: null,
  asyncStatus: "INIT",
};

export const createOrder = createAsyncThunk(
  "cart/create_order",
  async (payload, thunkApi) => {
    try {
      const response = await api.createOrder(payload);
      console.log(" create order", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "cart/confirm_order",
  async (payload, thunkApi) => {
    try {
      const response = await api.confirmOrder(payload);
      console.log(" confirm order", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        console.log("this is action.payload.data", action.payload);
        state.data = [...state.data, action.payload];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
    builder
      .addCase(confirmOrder.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        console.log("this is action.payload.data", action.payload);
        state.data = [...state.data, action.payload];
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
  },
});

export default ordersSlice.reducer;
