const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../models/User"); // 🆕
require("dotenv").config();

const router = express.Router();

// ⚙️ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ⚙️ Multer config
const upload = multer({ dest: "uploads/" });

// 🖼️ Upload + Lưu avatar cho user
router.post("/upload", upload.single("avatar"), async (req, res) => {
  try {
    const { email } = req.body; // 🆕 Nhận email người dùng

    if (!req.file) return res.status(400).json({ message: "Chưa chọn ảnh!" });
    if (!email) return res.status(400).json({ message: "Thiếu email người dùng!" });

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    // Xóa file tạm
    fs.unlinkSync(req.file.path);

    // 🔥 Lưu URL ảnh vào MongoDB
    await User.findOneAndUpdate({ email }, { avatar: result.secure_url });

    res.json({
      message: "Cập nhật avatar thành công!",
      url: result.secure_url,
    });
  } catch (err) {
    console.error("❌ Lỗi upload:", err);
    res.status(500).json({ message: "Lỗi server khi upload!" });
  }
});

module.exports = router;
