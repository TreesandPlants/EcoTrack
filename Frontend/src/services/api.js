import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const storage = localStorage.getItem("token")
      ? localStorage
      : sessionStorage;

    const token = storage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired or invalid JWT tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    const isTokenExpired =
      status === 401 &&
      (
        message === "jwt expired" ||
        message === "Token expired" ||
        message === "Invalid token"
      );

    if (isTokenExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("email");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;