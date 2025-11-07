// frontend/src/api.js
import axios from "axios";

// ✅ Nếu deploy trên Vercel → dùng Render
// ✅ Nếu chạy local → dùng localhost:5000
const API_ORIGIN = process.env.REACT_APP_API_URL || "http://localhost:5000";
const API_BASE = `${API_ORIGIN}/api`;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default api;
