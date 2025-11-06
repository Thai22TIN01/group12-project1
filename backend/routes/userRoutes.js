// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, isAdmin, isAdminOrModerator } = require("../middleware/authMiddleware");

// 🟢 Lấy danh sách tất cả user (chỉ Admin)
router.get("/", protect, isAdmin, userController.getUsers);

// 🟡 Thêm user mới (chỉ Admin)
router.post("/", protect, isAdmin, userController.addUser);

// 🟠 Cập nhật user (Admin hoặc Moderator)
router.put("/:id", protect, userController.updateUser);


// 🔴 Xóa user (chỉ Admin)
router.delete("/:id", protect, isAdmin, userController.deleteUser);

module.exports = router;
