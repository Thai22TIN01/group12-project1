const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🟢 Middleware xác thực người dùng (có token hợp lệ)
exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Không có token!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(404).json({ message: "Người dùng không tồn tại!" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

// 🟡 Kiểm tra quyền Admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Không có quyền Admin!" });
  }
};

// 🟠 Kiểm tra quyền Moderator hoặc Admin
exports.isAdminOrModerator = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "moderator")) {
    next();
  } else {
    res.status(403).json({ message: "Chỉ Admin hoặc Moderator được phép thực hiện!" });
  }
};
