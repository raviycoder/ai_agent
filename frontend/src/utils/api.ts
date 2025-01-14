import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to the header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;