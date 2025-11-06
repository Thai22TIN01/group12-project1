// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 🟢 Các route Authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken); // ✅ Cấp lại access token
router.post("/logout", authController.logout);

// 🟢 Gộp luôn chức năng quên / đặt lại mật khẩu
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
