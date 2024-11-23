import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VITE_API_URL!,
  timeout: 30_000,
});

instance.interceptors.request.use((config) => {
  if (config["headers"]) {
    const token = localStorage.getItem(process.env.VITE_TOKEN_KEY!);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
