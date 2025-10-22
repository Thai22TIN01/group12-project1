const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ✅ Các route CRUD đầy đủ
router.get("/", userController.getUsers);       // GET toàn bộ user
router.post("/", userController.addUser);       // POST thêm user mới
router.put("/:id", userController.updateUser);  // PUT sửa user
router.delete("/:id", userController.deleteUser); // DELETE xóa user

module.exports = router;
