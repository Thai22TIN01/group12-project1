// src/api.js
import axios from "axios";

// ✅ Tự động đọc URL backend từ biến môi trường Vercel
const API_ORIGIN = process.env.REACT_APP_API_URL || "http://localhost:5000";
const API = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,
});

export default API;
