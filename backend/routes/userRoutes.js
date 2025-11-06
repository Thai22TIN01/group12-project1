// 🟢 Routes quản lý người dùng có phân quyền (Buổi 6 - Hoạt động 2)
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, isAdmin, isAdminOrModerator } = require("../middleware/authMiddleware");

// 🟢 Lấy danh sách tất cả user (chỉ Admin xem được)
router.get("/", protect, isAdmin, userController.getUsers);

// 🟡 Thêm user mới (chỉ Admin)
router.post("/", protect, isAdmin, userController.addUser);

// 🟠 Sửa thông tin user (Admin hoặc Moderator)
router.put("/:id", protect, isAdminOrModerator, userController.updateUser);

// 🔴 Xóa user (chỉ Admin)
router.delete("/:id", protect, isAdmin, userController.deleteUser);

module.exports = router;
