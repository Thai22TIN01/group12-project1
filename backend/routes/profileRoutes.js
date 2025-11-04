const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

// 🟢 Lấy thông tin người dùng: GET /api/profile
router.get("/", protect, getProfile);

// 🟢 Cập nhật thông tin người dùng: PUT /api/profile
router.put("/", protect, updateProfile);

module.exports = router;
