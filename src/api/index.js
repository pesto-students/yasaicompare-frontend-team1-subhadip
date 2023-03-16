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

export const getShops = async () => {
  const location = await getGeolocation();
  const start = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  return axiosApiInstance.get(
    `${SERVER_URL}/shops?latitude=${start.latitude}&longitude=${start.longitude}&pincode=110011`
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
  return axiosApiInstance.get(`${SERVER_URL}/cart`, {
    accessToken: localStorage.getItem("accessToken"),
  });
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

export const updateCartItem = (
  apiArgs = {
    cart_id: "",
    quantity: "",
  }
) => {
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
