import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api";

const initialState = {
  data: {},
  error: null,
  asyncStatus: "INIT",
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload = { email: "", password: "" }, thunkApi) => {
    try {
      const response = await api.login(payload);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data || { data: error.message }
      );
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (payload, thunkApi) => {
    try {
      const response = await api.getUserInfo();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data || { data: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.asyncStatus = "FAILURE";
        state.error = action.payload.data;
      });

    builder
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.asyncStatus = "LOADING";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.asyncStatus = "SUCCESS";
        state.data = { ...state.data, ...action.payload.response };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.asyncStatus = "FAILURE";
        state.error = action.payload.data;
      });
  },
});

export default authSlice.reducer;
