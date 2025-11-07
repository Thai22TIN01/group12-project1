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

// ✅ Cấu hình CORS cho phép cả localhost và các domain Vercel
const allowedOrigins = [
  "http://localhost:3000",
  "https://group12-project1-hfkd.vercel.app",
  "https://group12-project1-hfkd-loc2nr3ny-vinhcongles-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ---- Rate limiting (chống spam API)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100,
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
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advanced", advancedRoutes);
app.use("/api/forgot", forgotRoutes);
app.use("/api/upload", uploadRoutes);

// ---- Health check route
app.get("/health", (req, res) => res.json({ status: "ok", time: Date.now() }));

// ---- 404 handler
app.use((req, res) => {
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
