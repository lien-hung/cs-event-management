import Cookies from "js-cookie";

const baseUrl = "https://event-management-api-f2ayc6fagkd7d6dd.southeastasia-01.azurewebsites.net";
const token = Cookies.get("token");

const API = {
  async request<T>(endpoint: string, config: RequestInit = {}) {
    const url = new URL(endpoint, baseUrl);
    if (token) {
      config.headers = { ...config.headers, "Authorization": `Bearer ${token}` };
    }

    const response = await fetch(url, config);
    if (response.ok && response.headers.get("Content-Type")?.includes("json")) {
      return await response.json() as T;
    }
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