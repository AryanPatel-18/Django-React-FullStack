import axios from "axios";
import { ACCESS_TOKEN } from "./constants";


// Getting the base url from the .env file that is used to access the backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    // This is done so that the http process can be cancelled before its completion
    // This code is written to create a new cancel token
    if (!config.cancelToken) {
        // Create a new cancel token source so that new cancel token can be stored there
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        // config.cancelSource = source
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
