import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api";

const initialState = {
  data: {},
  error: null,
  asyncStatus: "INIT",
};

// create an async thunk for shops request
export const fetchShops = createAsyncThunk(
  "shops",
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
  "shops/:id",
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
  "shops/register",
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
  "shops/update",
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
      .addCase(fetchShopsById.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchShopsById.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(fetchShopsById.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });

    builder
      .addCase(CreateShops.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(CreateShops.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(CreateShops.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
    builder
      .addCase(UpdateShops.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(UpdateShops.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(UpdateShops.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
  },
});

export default shopsSlice.reducer;
