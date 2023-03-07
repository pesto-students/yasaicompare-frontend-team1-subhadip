import axios from "axios";
import { SERVER_URL } from "../config";

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

export const getShops = () => axiosApiInstance.get(`${SERVER_URL}/shops`);

export const getShopsById = (id) =>
  axiosApiInstance.get(`${SERVER_URL}/shops/${id}`);

export const createShops = (
  apiArgs = {
    email: "",
    adress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    active: "",
  }
) =>
  axiosApiInstance.post(
    `${SERVER_URL}/shops/register`,
    { ...apiArgs },
    { accessToken: localStorage.getItem("accessToken") },
    { withCredentials: true }
  );

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
