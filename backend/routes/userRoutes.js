const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ROUTE API CRUD
router.get("/users", userController.getUsers);         // GET: lấy danh sách
router.post("/users", userController.createUser);      // POST: thêm mới
router.put("/users/:id", userController.updateUser);   // PUT: sửa
router.delete("/users/:id", userController.deleteUser); // DELETE: xóa

module.exports = router;