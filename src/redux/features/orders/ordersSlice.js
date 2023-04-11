import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api";

const initialState = {
  active_orders: [],
  delivered_orders: [],
  data: [],
  error: null,
  asyncStatus: "INIT",
};

export const getAllOrders = createAsyncThunk(
  "orders/get_all_orders",
  async (payload, thunkApi) => {
    try {
      const response = await api.getOrders(payload);
      console.log(" get all orders", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
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
        state.data = [...state.data, action.payload];
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        action.payload.preparedData.map((order) => {
          if (order.order_status === "delivered") {
            state.delivered_orders = [...state.delivered_orders, order];
          } else {
            state.active_orders = [...state.active_orders, order];
          }
        });
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
  },
});

export default ordersSlice.reducer;
