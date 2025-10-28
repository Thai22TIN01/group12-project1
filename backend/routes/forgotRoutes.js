const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const transporter = require("../utils/mailer");

const router = express.Router();

// 🟢 Gửi email quên mật khẩu
router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Vui lòng nhập email!" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({
        message: "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.",
      });

    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Đặt lại mật khẩu - ToDoList",
      html: `
        <h3>Xin chào ${user.name || ""}</h3>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
        <p>Nhấn vào liên kết bên dưới để đặt lại (hết hạn sau 1 giờ):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return res.json({ message: "✅ Đã gửi email đặt lại mật khẩu!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
});

// 🟢 Đặt lại mật khẩu
router.post("/reset", async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword)
    return res.status(400).json({ message: "Thiếu thông tin!" });

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ message: "✅ Mật khẩu mới đã được cập nhật!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
});

module.exports = router;
