// src/api.js
import axios from "axios";

// ✅ Tự động nhận URL backend:
// - Khi chạy local: dùng http://localhost:5000
// - Khi deploy Vercel: dùng biến môi trường REACT_APP_API_URL
const API_ORIGIN = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Tạo instance axios mặc định
const API = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true, // hỗ trợ cookie/session nếu cần
});

// 🧩 Gắn sẵn token nếu có
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
