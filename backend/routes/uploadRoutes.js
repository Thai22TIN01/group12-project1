const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// ⚙️ Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ⚙️ Cấu hình Multer (lưu tạm file vào thư mục uploads/)
const upload = multer({ dest: "uploads/" });

// 🖼️ Upload avatar và lưu link vào MongoDB
router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    const { email } = req.body;

    if (!req.file) return res.status(400).json({ message: "Chưa chọn ảnh!" });
    if (!email) return res.status(400).json({ message: "Thiếu email người dùng!" });

    // ✅ Upload ảnh lên Cloudinary (trong thư mục "avatars")
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    // ✅ Xóa file tạm sau khi upload xong
    fs.unlinkSync(req.file.path);

    // ✅ Cập nhật avatar mới vào MongoDB và trả lại user đã update
    const user = await User.findOneAndUpdate(
      { email },
      { avatar: result.secure_url },
      { new: true } // trả về dữ liệu mới sau khi update
    );

    // Nếu không tìm thấy user => báo lỗi
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });

    res.json({
      message: "✅ Cập nhật avatar thành công!",
      avatarUrl: result.secure_url,
      user, // trả user mới để frontend có thể cập nhật state
    });
  } catch (err) {
    console.error("❌ Lỗi upload:", err);
    res.status(500).json({ message: "Lỗi server khi upload!" });
  }
});

module.exports = router;
