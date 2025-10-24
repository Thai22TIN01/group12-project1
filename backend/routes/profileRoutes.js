const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

// 🟢 Lấy thông tin người dùng
router.get("/profile", protect, getProfile);

// 🟢 Cập nhật thông tin người dùng
router.put("/profile", protect, updateProfile);

module.exports = router;
