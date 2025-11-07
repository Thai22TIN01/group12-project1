// src/api.js
import axios from "axios";

// ✅ Tạm thời gán trực tiếp backend Render (bỏ env)
const API_ORIGIN = "https://group12-project1-zrv7.onrender.com";

// ✅ Tạo instance axios mặc định
const API = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,
});

// 🧩 Gắn token nếu có
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
