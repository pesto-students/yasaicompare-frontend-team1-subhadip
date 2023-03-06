import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api";

const initialState = {
  data: {},
  error: null,
  asyncStatus: "INIT",
};

// create an async thunk for shops request
export const fetchShops = createAsyncThunk(
  "shops/fetchShop",
  async (payload, thunkApi) => {
    try {
      const response = await api.getShops();
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const fetchShopsById = createAsyncThunk(
  "shops/fetchShopsById",
  async (payload, thunkApi) => {
    try {
      const response = await api.getShopsById();
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const CreateShops = createAsyncThunk(
  "shops/createShops",
  async (
    payload = {
      email: "",
      adress: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      active: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.createShops(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const UpdateShops = createAsyncThunk(
  "shops/updateShops",
  async (
    payload = {
      email: "",
      adress: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      active: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.updateShops(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const GetItemsByShopId = createAsyncThunk(
  "inventory/getItemsByShopId",
  async (payload, thunkApi) => {
    try {
      console.log(payload);
      const response = await api.getItemsByShopId(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
    builder
      .addCase(GetItemsByShopId.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(GetItemsByShopId.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(GetItemsByShopId.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
  },
});

export default shopsSlice.reducer;
