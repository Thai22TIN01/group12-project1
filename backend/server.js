// 🟢 server.js — Backend Authentication + Profile + Admin + Advanced
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import các route
const userRoutes = require("./routes/userRoutes");       // CRUD (Buổi 4)
const authRoutes = require("./routes/authRoutes");       // Authentication (Hoạt động 1)
const profileRoutes = require("./routes/profileRoutes"); // Profile (Hoạt động 2)
const adminRoutes = require("./routes/adminRoutes");     // Admin (Hoạt động 3)
const advancedRoutes = require("./routes/advancedRoutes"); // 🆕 Advanced (Hoạt động 4)

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
app.use("/", authRoutes);

// ✅ Dùng route Profile (Hoạt động 2)
app.use("/", profileRoutes);

// ✅ Dùng route Admin (Hoạt động 3)
app.use("/", adminRoutes);

// ✅ Dùng route Advanced (Hoạt động 4)
app.use("/", advancedRoutes); // 👈 Thêm dòng này

// ✅ Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
