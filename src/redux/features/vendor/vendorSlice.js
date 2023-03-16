import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../../api";

const initialState = {
  data: {
    shops: [],
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
  },
});

export default vendorSlice.reducer;
