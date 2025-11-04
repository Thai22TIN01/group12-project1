const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer");

// ---------------------- Sign Up ----------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- Login ----------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email không tồn tại!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Sai mật khẩu!" });

    // ✅ Tạo JWT chứa role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Trả về token + role + thông tin user
    res.json({
      message: "Đăng nhập thành công!",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- Logout ----------------------
exports.logout = (req, res) => {
  res.json({ message: "Đăng xuất thành công (client xóa token)" });
};

// ---------------------- Forgot Password ----------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email không tồn tại!" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${user.email}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      text: `Click link để reset mật khẩu: ${resetUrl}`,
    });

    res.json({ message: "Đã gửi email reset password. Kiểm tra hộp thư." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- Reset Password ----------------------
exports.resetPassword = async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });

    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Đổi mật khẩu thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
