const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 🟢 Các route Authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken); // 👈 thêm dòng này
router.post("/logout", authController.logout);

module.exports = router;
