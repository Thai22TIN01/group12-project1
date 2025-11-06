const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// 🟢 Chỉ admin mới được xem danh sách user
router.get("/all", protect, isAdmin, getAllUsers);

// 🟢 Chỉ admin mới được xóa user
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
