import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const getToken = (): string | null => {
  return localStorage.getItem("userData");
};

const AUTH_API: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AUTH_API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const data = getToken(); // Retrieve token from localStorage
    config.headers = config.headers || {};
    if (data) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(data).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AUTH_API;
