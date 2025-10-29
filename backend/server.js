// 🟢 server.js — Backend Authentication + Profile + Admin + Advanced + Forgot Password + Upload Avatar
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import các route
const userRoutes = require("./routes/userRoutes");         // CRUD (Buổi 4)
const authRoutes = require("./routes/authRoutes");         // Authentication (Hoạt động 1)
const profileRoutes = require("./routes/profileRoutes");   // Profile (Hoạt động 2)
const adminRoutes = require("./routes/adminRoutes");       // Admin (Hoạt động 3)
const advancedRoutes = require("./routes/advancedRoutes"); // Advanced (Hoạt động 4)
const forgotRoutes = require("./routes/forgotRoutes");     // Quên mật khẩu (Email Reset)
const uploadRoutes = require("./routes/uploadRoutes");     // 🆕 Upload Avatar (Hoạt động 5)

dotenv.config();
const app = express();

// Middleware
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

// ✅ Dùng route Profile (Hoạt động 2)
app.use("/", profileRoutes);

// ✅ Dùng route Admin (Hoạt động 3)
app.use("/", adminRoutes);

// ✅ Dùng route Advanced (Hoạt động 4)
app.use("/", advancedRoutes);

// ✅ Dùng route Forgot Password (Hoạt động 5)
app.use("/", forgotRoutes);

// ✅ Dùng route Upload Avatar (Hoạt động 6)
app.use("/", uploadRoutes);

// ✅ Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
//29/10/2025
// End of server.js