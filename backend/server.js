// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

// ---- Security middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Cấu hình CORS linh hoạt (hỗ trợ localhost + Vercel)
const allowedOrigins = [
  "http://localhost:3000", // để test local
  process.env.FRONTEND_URL, // domain frontend trên Vercel (lấy từ .env)
].filter(Boolean); // bỏ các giá trị undefined/null

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

// ---- Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const advancedRoutes = require("./routes/advancedRoutes");
const forgotRoutes = require("./routes/forgotRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// ---- Register routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advanced", advancedRoutes);
app.use("/api/forgot", forgotRoutes);
app.use("/api/upload", uploadRoutes);

// ---- Health check
app.get("/", (req, res) => res.send("✅ Backend is running fine!"));
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
