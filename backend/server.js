console.log("🟢 RUNNING: backend/server.js");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // 🆕 route đăng ký / đăng nhập / refresh / logout
const testRoutes = require("./routes/testRoutes"); // 🆕 route test RefreshToken

// 🟡 Kiểm tra import
console.log("🟡 Đã import uploadTest_fixed.js và testRoutes.js trong server.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Route CRUD User
app.use("/api/users", userRoutes);

// ✅ Route Auth (đăng ký / đăng nhập / refresh / logout)
app.use("/api/auth", authRoutes);

// ✅ Route test RefreshToken (SV3)
app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

