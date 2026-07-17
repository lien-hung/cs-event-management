import Cookies from "js-cookie";

const baseUrl = "http://localhost:5146";
const token = Cookies.get("token");

const API = {
  async request<T>(endpoint: string, config: RequestInit = {}) {
    const url = new URL(endpoint, baseUrl);
    if (token) {
      config.headers = { ...config.headers, "Authorization": `Bearer ${token}` };
    }

    const response = await fetch(url, config);
    return await response.json() as T;
  },

  get: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "GET" }),

  post: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "POST" }),

  put: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "PUT" }),

  delete: async <T>(endpoint: string, config: RequestInit = {}) =>
    await API.request<T>(endpoint, { ...config, method: "DELETE" }),
};

export default API;