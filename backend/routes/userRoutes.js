const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controllers/userController");

// ✅ Các route API cơ bản
router.get("/", getUsers);     // GET /api/users
router.post("/", addUser);     // POST /api/users

module.exports = router;
