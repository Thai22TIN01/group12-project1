// 🟢 Routes quản lý người dùng có phân quyền (Buổi 6 - Hoạt động 2)
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const checkRole = require("../middleware/checkRole");

// ✅ Xem danh sách user – chỉ ADMIN được quyền
router.get("/", verifyAccessToken, checkRole(["admin"]), userController.getUsers);

// ✅ Thêm user mới – chỉ ADMIN được quyền thêm
router.post("/", verifyAccessToken, checkRole(["admin"]), userController.addUser);

// ✅ Cập nhật user – ADMIN hoặc chính chủ được phép
router.put("/:id", verifyAccessToken, userController.updateUser);

// ✅ Xóa user – chỉ ADMIN được quyền xóa
router.delete("/:id", verifyAccessToken, checkRole(["admin"]), userController.deleteUser);

module.exports = router;
