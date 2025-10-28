// 🟢 Routes cho Upload Avatar (Buổi 6 - Hoạt động 3)
const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const upload = require("../middleware/upload");

// Xem & cập nhật thông tin cá nhân
router.get("/", verifyAccessToken, profileController.getProfile);
router.put("/", verifyAccessToken, profileController.updateProfile);

// Upload ảnh đại diện
router.post(
  "/upload-avatar",
  verifyAccessToken,
  upload.single("avatar"),
  profileController.uploadAvatar
);

module.exports = router;
