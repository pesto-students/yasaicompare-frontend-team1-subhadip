import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../../api";

const initialState = {
  data: {
    shops: [],
  },
  error: null,
  asyncStatus: "INIT",
};

// create an async thunk for shops request
export const fetchShops = createAsyncThunk(
  "shops/fetchShop",
  async (payload, thunkApi) => {
    try {
      const response = await api.getShops(payload);
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
      const response = await api.getShopsById(payload);
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

export const fetchItemsByShopId = createAsyncThunk(
  "inventory/fetchItemsByShopId",
  async (payload, thunkApi) => {
    try {
      const response = await api.getItemsByShopId(payload);
      console.log("this is response", response.data);
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
        const idx = state.data.shops?.findIndex(
          (shop) => shop.shop_id === action.meta.arg
        );
        if (idx !== -1) {
          state.data.shops[idx] = {
            ...state.data.shops[idx],
            ...action.payload,
          };
        } else {
          state.data.shops = [action.payload];
        }
      })
      .addCase(fetchShopsById.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });

    builder
      .addCase(fetchItemsByShopId.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchItemsByShopId.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        const idx = state.data.shops?.findIndex(
          (shop) => shop.shop_id === action.meta.arg
        );
        if (idx !== -1) {
          state.data.shops[idx] = {
            ...state.data.shops[idx],
            inventory: action.payload.inventory,
          };
        }
      })
      .addCase(fetchItemsByShopId.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });

    builder
      .addCase(CreateShops.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(CreateShops.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        console.log(action.payload);
        state.data.shops.push(action.payload.data);
      })
      .addCase(CreateShops.rejected, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.error = action.payload.data;
      });
  },
});

export default shopsSlice.reducer;
