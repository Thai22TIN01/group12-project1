const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Không có token!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ fix: hỗ trợ token có field "userId" hoặc "id"
    const userId = decoded.userId || decoded.id;

    req.user = await User.findById(userId).select("-password");
    if (!req.user)
      return res.status(404).json({ message: "Người dùng không tồn tại!" });

    next();
  } catch (err) {
    console.error("❌ Token verify error:", err.message);
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

// 🟡 Chỉ admin được phép
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Không có quyền Admin!" });
};
