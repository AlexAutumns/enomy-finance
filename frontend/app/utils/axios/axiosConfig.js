import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add Interceptors
axiosInstance.interceptors.request.use(
    (config) => {
      console.log("JWT Token from sessionStorage:", jwtToken);
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
