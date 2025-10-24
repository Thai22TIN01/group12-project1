const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { forgotPassword, resetPassword, uploadAvatar } = require("../controllers/advancedController");
const { protect } = require("../middleware/authMiddleware");

// Quên mật khẩu
router.post("/forgot-password", forgotPassword);

// Đặt lại mật khẩu
router.post("/reset-password", resetPassword);

// Upload avatar (yêu cầu đăng nhập)
router.post("/upload-avatar", protect, upload.single("avatar"), uploadAvatar);

module.exports = router;
