const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // 👈 Đưa dòng này lên đây

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Dùng route CRUD
app.use("/api/users", userRoutes);

// ✅ Dùng route Authentication
app.use("/", authRoutes); // 👈 Đặt ở đây, trước app.listen()

// ✅ Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
