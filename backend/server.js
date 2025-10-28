// 🟢 server.js — Backend Authentication + Profile + RBAC + Upload Avatar (Buổi 6)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 🧩 Import các route
const userRoutes = require("./routes/userRoutes");       // CRUD (Buổi 4)
const authRoutes = require("./routes/authRoutes");       // Authentication (Buổi 6 - Hoạt động 1)
const profileRoutes = require("./routes/profileRoutes"); // Profile + Upload Avatar (Buổi 6 - Hoạt động 2 & 3)
const adminRoutes = require("./routes/adminRoutes");     // Admin (Buổi 6 - Hoạt động 4 nếu có)

dotenv.config();
const app = express();

// 🧱 Middleware
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Dùng route CRUD (Buổi 4)
app.use("/api/users", userRoutes);

// ✅ Dùng route Authentication (Hoạt động 1)
app.use("/auth", authRoutes);

// ✅ Dùng route Profile (Hoạt động 2 & 3)
app.use("/profile", profileRoutes);

// ✅ Dùng route Admin (Hoạt động 4 - nếu đã tạo)
app.use("/admin", adminRoutes);

// ✅ Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
