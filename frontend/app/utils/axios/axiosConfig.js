import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:8080", // Default to localhost:8080 if env var is not set
    headers: {
        "Content-Type": "application/json",
    },
});

// Add Interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const username = import.meta.env.VITE_REACT_APP_API_USERNAME;
        const password = import.meta.env.VITE_REACT_APP_API_PASSWORD;

        if (username && password) {
            config.auth = {
                username: username,
                password: password,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
