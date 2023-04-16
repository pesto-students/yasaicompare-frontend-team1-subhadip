import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import * as api from "../../../api";

const initialState = {
  data: {
    shops: [],
    inventory: [],
    orders: {
      order_status: [],
      delivery_status: [],
    },
  },
  error: null,
  asyncStatus: "INIT",
};

export const CreateShops = createAsyncThunk(
  "vendor/createShops",
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
      const responseTrue = await api.getAllInventory(payload, true);
      const responseFalse = await api.getAllInventory(payload, false);
      const data = {
        inventory: responseTrue.data.inventory.concat(
          responseFalse.data.inventory
        ),
      };
      return data;
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
      const response = await api.addInventoryItem(payload);
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
      const response = await api.getAllOrders(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "vendor/updateOrderStatus",
  async (payload, thunkApi) => {
    try {
      const response = await api.updateOrderStatus(payload);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const inventoryItemUpdate = createAsyncThunk(
  "vendor/inventoryItemUpdate",
  async (payload, thunkApi) => {
    try {
      const response = await api.updateInventory(payload);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorShops.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVendorShops.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.shops = action.payload;
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
        state.data.inventory = action.payload;
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(addItemToInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addItemToInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("additem.action.payload", action.payload.data);
        state.data.inventory.inventory = [
          ...state.data.inventory.inventory,
          action.payload.data,
        ];
      })
      .addCase(addItemToInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        action.payload.orders.map((order) => {
          if (
            order.order_status === "confirmed" ||
            order.order_status === "pending"
          ) {
            state.data.orders.order_status = [
              ...state.data.orders.order_status,
              order,
            ];
          } else if (
            order.order_status === "delivered" ||
            order.order_status === "in_transit"
          ) {
            state.data.orders.delivery_status = [
              ...state.data.orders.delivery_status,
              order,
            ];
          }
        });
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(CreateShops.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(CreateShops.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.shops.shops = [
          ...state.data.shops.shops,
          action.payload.data,
        ];
      })
      .addCase(CreateShops.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(inventoryItemUpdate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(inventoryItemUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const currentState = current(state.data.inventory.inventory);
        const updatedState = currentState.map((item, index) => {
          if (item.item_id === action.payload.data.item_id) {
            const resut = {
              ...item,
              ...action.payload.data,
            };
            item = resut;
            return item;
          }
          return item;
        });
        state.data.inventory.inventory = [...updatedState];
      })
      .addCase(inventoryItemUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default vendorSlice.reducer;
