const User = require("../models/User");

// 🟢 Lấy danh sách tất cả người dùng (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng!" });
  }
};

// 🟢 Xóa người dùng theo ID (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user!" });
    res.json({ message: "Xóa user thành công!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
