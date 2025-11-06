const express = require("express");
const RefreshToken = require("../models/RefreshToken");
const router = express.Router();

// Lấy tất cả Refresh Token
router.get("/tokens", async (req, res) => {
  const tokens = await RefreshToken.find().populate("userId", "email");
  res.json(tokens);
});

module.exports = router;
