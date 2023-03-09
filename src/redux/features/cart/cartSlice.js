// Get cart items

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (payload, thunkApi) => {
    try {
      const response = await api.getCartItems(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Add to Cart

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    payload = {
      shop_id: "",
      item_id: "",
      quantity: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.addToCart(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Update the cart item quantity

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    payload = {
      shop_id: "",
      item_id: "",
      quantity: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.updateCartItem(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

// Delete the cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (
    payload = {
      shop_id: "",
      item_id: "",
    },
    thunkApi
  ) => {
    try {
      const response = await api.deleteCartItem(payload);
      console.log("this is response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
