import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api";
const initialState = {
  data: [],
  error: null,
  asyncStatus: "INIT",
};

export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async (payload, thunkApi) => {
    try {
      const response = await api.getUserAddresses();
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addNewAdress = createAsyncThunk(
  "address/addNewAdress",
  async (payload, thunkApi) => {
    try {
      const response = await api.addNewAddress(payload);
      console.log("response for adding new address", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (payload, thunkApi) => {
    try {
      const response = await api.updateAddress(payload);
      console.log("response for updating address", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload.addresses;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.asyncStatus = "FAILURE";
        state.error = action.payload;
      });
    builder // add new address
      .addCase(addNewAdress.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(addNewAdress.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = [...state.data, action.payload];
      })
      .addCase(addNewAdress.rejected, (state, action) => {
        state.asyncStatus = "FAILURE";
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
