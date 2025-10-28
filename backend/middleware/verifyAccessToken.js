// 🟢 Middleware xác thực Access Token (Buổi 6 - Hoạt động 2)
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Thiếu access token!" });
    }

    // Xác thực token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
      }

      req.user = user; // Gắn thông tin user vào request (để checkRole dùng)
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
