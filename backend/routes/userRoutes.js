// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUsers, addUser, updateUser, deleteUser } = require("../controllers/userController");

// Route CRUD bình thường
router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// 🆕 Route test: lấy user role = Admin
router.get("/admins", async (req, res) => {
  const User = require("../models/User");
  const admins = await User.find({ role: "Admin" });
  res.json(admins);
});

module.exports = router;
