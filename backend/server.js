// backend/server.js
// 🟢 server.js — Backend Authentication + Profile + Admin + Advanced + Forgot Password + Upload Avatar
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// ---- Import routes
const userRoutes = require("./routes/userRoutes");         // CRUD (Buổi 4)
const authRoutes = require("./routes/authRoutes");         // Authentication (Hoạt động 1)
const profileRoutes = require("./routes/profileRoutes");   // Profile (Hoạt động 2)
const adminRoutes = require("./routes/adminRoutes");       // Admin (Hoạt động 3)
const advancedRoutes = require("./routes/advancedRoutes"); // Advanced (Hoạt động 4)
const forgotRoutes = require("./routes/forgotRoutes");     // Quên mật khẩu (Email Reset)
const uploadRoutes = require("./routes/uploadRoutes");     // Upload Avatar (Hoạt động 6)

const app = express();

// ---- Security middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// ---- CORS cho phép frontend truy cập
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://group12-project1-lgwn.vercel.app"
  ],
  credentials: true,
}));

// ---- Rate limiting (chống spam API)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // mỗi IP chỉ được 100 requests / 15 phút
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
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---- Register routes (prefix chuẩn /api/...)
app.use("/api/users", userRoutes);          // Buổi 4
app.use("/api/auth", authRoutes);           // Đăng ký / đăng nhập / refresh / logout / forgot / reset
app.use("/api/profile", profileRoutes);     // Hồ sơ cá nhân
app.use("/api/admin", adminRoutes);         // Quản trị (Admin)
app.use("/api/advanced", advancedRoutes);   // Advanced features (RBAC, token, phân quyền)
app.use("/api/forgot", forgotRoutes);       // Quên mật khẩu (Email reset)
app.use("/api/upload", uploadRoutes);       // Upload Avatar (Cloudinary)

// ---- Health check route
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
