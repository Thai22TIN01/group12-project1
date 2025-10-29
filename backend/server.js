// backend/server.js
// 🟢 server.js — Backend Authentication + Profile + Admin + Advanced + Forgot Password + Upload Avatar
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");         // CRUD (Buổi 4)
const authRoutes = require("./routes/authRoutes");         // Authentication (Hoạt động 1)
const profileRoutes = require("./routes/profileRoutes");   // Profile (Hoạt động 2)
const adminRoutes = require("./routes/adminRoutes");       // Admin (Hoạt động 3)
const advancedRoutes = require("./routes/advancedRoutes"); // Advanced (Hoạt động 4)
const forgotRoutes = require("./routes/forgotRoutes");     // Quên mật khẩu (Email Reset)
const uploadRoutes = require("./routes/uploadRoutes");     // Upload Avatar (Hoạt động 6)

const app = express();

// ---- Security & general middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // ghi log request vào terminal

// ---- Rate limiting (áp dụng cho tất cả endpoint bắt đầu bằng /api)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // mỗi IP tối đa 100 requests trong window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.",
  },
});
app.use("/api", apiLimiter);

// ---- MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---- Routes (prefix nhất quán)
app.use("/api/users", userRoutes);           // CRUD user
app.use("/api/auth", authRoutes);            // signup / login / refresh / logout
app.use("/api/profile", profileRoutes);      // profile, upload avatar nếu muốn
app.use("/api/admin", adminRoutes);          // admin routes
app.use("/api/advanced", advancedRoutes);    // advanced features (RBAC, refresh token...)
app.use("/api/forgot", forgotRoutes);        // forgot/reset password
app.use("/api/upload", uploadRoutes);        // upload avatar/files

// ---- Health check
app.get("/health", (req, res) => res.json({ status: "ok", time: Date.now() }));

// ---- 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Không tìm thấy endpoint." });
});

// ---- Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi máy chủ nội bộ",
  });
});

// ---- Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
