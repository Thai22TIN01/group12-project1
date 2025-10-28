// 🟢 Cập nhật lần 2: thêm comment để tạo PR Hoạt động 2 (SV1 Nguyễn Đình Thái)


// 🟢 Middleware kiểm tra quyền người dùng (Buổi 6 - Hoạt động 2)
module.exports = function (roles) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // role lấy từ token đã xác thực
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Không có quyền truy cập!" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};
