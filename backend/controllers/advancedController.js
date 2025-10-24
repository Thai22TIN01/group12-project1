const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinary");

// 🟢 Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Khôi phục mật khẩu",
      html: `<p>Nhấn vào link sau để đặt lại mật khẩu:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Đã gửi link reset password tới email!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hash });
    res.json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (err) {
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

// 🟢 Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const uploadResult = await cloudinary.uploader.upload(file.path, { folder: "avatars" });
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: uploadResult.secure_url }, { new: true });
    res.json({ message: "Cập nhật avatar thành công!", avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
