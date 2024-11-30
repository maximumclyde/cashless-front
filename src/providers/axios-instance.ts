import axios from "axios";
import { router } from "@/providers";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL!,
  timeout: 30_000,
});

instance.interceptors.request.use((config) => {
  if (config["headers"]) {
    const persistentState = localStorage.getItem(
      import.meta.env.VITE_TOKEN_KEY!
    );

    const token = JSON.parse(persistentState!)?.state?.token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (response) => {
    if (
      typeof response.response.data === "string" &&
      response.response.data.includes("token")
    ) {
      router.navigate("/login");
      return Promise.reject(response);
    }

    return Promise.reject(response);
  }
);

export default instance;
