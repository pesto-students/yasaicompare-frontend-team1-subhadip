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
  reducers: {
    markCurrentAddress: (state, action) => {
      state.data.forEach((address) => {
        if (address.id === action.payload) {
          address.current = true;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        return {
          ...state,
          asyncStatus: "SUCCESS",
          data: action.payload.addresses,
        };
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
        return {
          ...state,
          asyncStatus: "SUCCESS",
          data: [...state.data, action.payload.response],
        };
      })
      .addCase(addNewAdress.rejected, (state, action) => {
        state.asyncStatus = "FAILURE";
        state.error = action.payload;
      });
    builder // update address
      .addCase(updateAddress.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        var previousdata = state.data.map((address) => {
          if (address.id === action.payload.response.id) {
            address = action.payload.response;
            return address;
          }
          return address;
        });
        return {
          ...state,
          asyncStatus: "SUCCESS",
          data: [...previousdata],
        };
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.asyncStatus = "FAILURE";
        state.error = action.payload;
      });
  },
});

export const { markCurrentAddress } = addressSlice.actions;

export default addressSlice.reducer;
