import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../../api";

const initialState = {
  data: {
    shops: [],
    orders: {
      draft: [],
      pending: [],
      delievered: [],
    },
  },
  error: null,
  asyncStatus: "INIT",
};

export const fetchVendorShops = createAsyncThunk(
  "vendor/fetchVendorShops",
  async (payload, thunkApi) => {
    try {
      const response = await api.getVendorShops(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllInventory = createAsyncThunk(
  "vendor/fetchAllInventory",
  async (payload, thunkApi) => {
    try {
      const response = await api.getAllInventory(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addItemToInventory = createAsyncThunk(
  "vendor/addItemToInventory",
  async (payload, thunkApi) => {
    try {
      const response = await api.addItem(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addInventory = createAsyncThunk(
  "vendor/addInventory",
  async (payload, thunkApi) => {
    try {
      const response = await api.addNewInventory(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "vendor/uploadImage",
  async (payload, thunkApi) => {
    try {
      console.log("payload", payload);
      const response = await api.uploadImage(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "vendor/fetchAllOrders",
  async (payload, thunkApi) => {
    try {
      console.log("pay", payload);
      const response = await api.getAllOrders(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const vendorSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorShops.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVendorShops.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchVendorShops.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(fetchAllInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(addInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.meta.arg.status === "draft") {
          state.data.orders.draft = action.payload;
        } else if (action.meta.arg.status === "pending") {
          state.data.orders.pending = action.payload;
        } else if (action.meta.arg.status === "delievered") {
          state.data.orders.delievered = action.payload;
        }
        // state.data.orders.
        // state.data = action.payload;
        // console.log("action", action);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default vendorSlice.reducer;
