import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VITE_API_URL!,
  timeout: 30_000,
});

instance.interceptors.request.use((config) => {
  if (config["headers"]) {
    const token = localStorage.getItem(process.env.VITE_TOKEN_KEY!);

    if (!token) {
      Promise.reject("No token");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (response) => {
    if (typeof response.data === "string" && response.data.includes("token")) {
      window.history.pushState(null, "", "/login");
      window.history.go(0);
      return Promise.reject(response);
    }

    return Promise.reject(response);
  }
);

export default instance;
