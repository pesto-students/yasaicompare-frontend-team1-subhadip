import axios from "axios";
import { SERVER_URL } from "../config";
import { getGeolocation } from "../utils/commons";
// Request interceptor for API calls
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await refreshAccessToken();
      localStorage.setItem("accessToken", res.data.accessToken);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.accessToken;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const login = (apiArgs = { email: "", password: "" }) =>
  axiosApiInstance.post(
    `${SERVER_URL}/auth/login`,
    { ...apiArgs },
    { withCredentials: true }
  );

export const getShops = async (payload) => {
  return axiosApiInstance.get(
    `${SERVER_URL}/shops?latitude=${payload.latitude}&longitude=${payload.longitude}&pincode=${payload.pincode}`
  );
};

export const getShopsById = (id) =>
  axiosApiInstance.get(`${SERVER_URL}/shops/${id}`);

export const createShops = (apiArgs) =>
  axiosApiInstance.post(`${SERVER_URL}/shops/register`, { ...apiArgs });

// export const login = async (apiArgs = { email: "", password: "" }) => {
//   const res = await fetch(
//     `${SERVER_URL}/auth/login`,
//     {
//       method: "POST",
//       body: apiArgs,
//     },
//     { credentials: "include" }
//     // { ...apiArgs },
//     // { withCredentials: true }
//   );
//   return res.json();
// };

export const refreshAccessToken = () =>
  axiosApiInstance.post(
    `${SERVER_URL}/auth/refresh-token`,
    {},
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

export const getUserInfo = () =>
  axiosApiInstance.get(`${SERVER_URL}/user/info`);

export const updateShops = () =>
  axiosApiInstance.put(`${SERVER_URL}/shops/update`);

export const getItemsByShopId = (id) => {
  return axiosApiInstance.get(`${SERVER_URL}/inventory/${id}`);
};

export const getCartItems = () => {
  return axiosApiInstance.get(`${SERVER_URL}/cart`);
};

export const addToCart = (
  apiArgs = {
    shop_id: "",
    item_id: "",
    quantity: "",
  }
) => {
  return axiosApiInstance.post(`${SERVER_URL}/cart`, { ...apiArgs });
};

export const updateCartItem = (apiArgs) => {
  return axiosApiInstance.put(`${SERVER_URL}/cart/${apiArgs.cart_id}`, {
    quantity: apiArgs.quantity,
  });
};

export const deleteCartItem = (
  apiArgs = {
    cart_id: "",
  }
) => {
  return axiosApiInstance.delete(`${SERVER_URL}/cart/${apiArgs.cart_id}`, {
    data: apiArgs,
  });
};

// Handling Adresses
export const getUserAddresses = () =>
  axiosApiInstance.get(`${SERVER_URL}/user/address`);

export const addNewAddress = (apiArgs = {}) =>
  axiosApiInstance.post(`${SERVER_URL}/user/address`, { ...apiArgs });

export const updateAddress = (apiArgs) =>
  axiosApiInstance.put(`${SERVER_URL}/user/address`, {
    ...apiArgs,
  });

// handling vendor slices

export const getVendorShops = () =>
  axiosApiInstance.get(`${SERVER_URL}/vendor/shops`);

export const getAllInventory = (payload) =>
  axiosApiInstance.get(`${SERVER_URL}/inventory/${payload}`);

export const addNewInventory = (apiArgs) =>
  axiosApiInstance.post(`${SERVER_URL}/inventory`, { ...apiArgs });

export const updateInventory = (apiArgs) =>
  axiosApiInstance.put(`${SERVER_URL}/inventory/${apiArgs.id}`, {
    ...apiArgs,
  });

export const uploadImage = (apiArgs) =>
  axiosApiInstance.post(`${SERVER_URL}/upload/item-image`, apiArgs);

export const addInventoryItem = (apiArgs) => {
  var id = apiArgs.shop_id;
  delete apiArgs.shop_id;
  return axiosApiInstance.post(`${SERVER_URL}/inventory/${id}/create`, {
    ...apiArgs,
  });
};

export const updateOrderStatus = (apiArgs) =>
  axiosApiInstance.put(
    `${SERVER_URL}/vendor/order/${apiArgs.shopId}/${apiArgs.orderId}`,
    {
      order_status: apiArgs.status,
    }
  );

export const getAllOrders = (args) =>
  axiosApiInstance.get(`${SERVER_URL}/vendor/order/${args.shopId}`);

export const getOrders = () => axiosApiInstance.get(`${SERVER_URL}/order`);

export const createOrder = (args) =>
  axiosApiInstance.post(`${SERVER_URL}/order/create`, { ...args });

export const confirmOrder = (args) =>
  axiosApiInstance.get(
    `${SERVER_URL}/order/confirm-order?user_token=${args.user_token}&order_group_id=${args.order_group_id}&payment_intent=${args.payment_intent}&payment_intent_client_secret=${args.payment_intent_client_secret}&redirect_status=${args.redirect_status}`
  );
