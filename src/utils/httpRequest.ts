import axios, { type InternalAxiosRequestConfig } from "axios";
import { isLogin } from "../services/authService";
import authHeader from "./authHeader";

// import { refreshToken } from "../services/authService";

const httpRequest = axios.create({
  baseURL: import.meta.env["VITE_API_URL"],
});

httpRequest.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    if (isLogin()) {
      const headers = authHeader();
      if (headers.authorization) {
        // Ensure config.headers is properly initialized
        config.headers = config.headers || {};
        config.headers["Authorization"] = headers.authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* httpRequest.interceptors.response.use(
  (res) => {
    return { data: res, status: 200 };
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401) {
      const accessToken = await refreshToken();
      originalConfig.headers["authorization"] = accessToken;
      return httpRequest(originalConfig);
    }
    return Promise.reject(err);
  }
); */

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, body: any, options = {}) => {
  const response = await httpRequest.post(path, body, options);
  return response.data;
};

export const put = async (path: string, body?: any, options = {}) => {
  const response = await httpRequest.put(path, body, options);
  return response.data;
};

export const del = async (path: string, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response.data;
};

export default httpRequest;
