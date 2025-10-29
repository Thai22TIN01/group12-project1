// 🟢 Controller quản lý người dùng (Buổi 6 - Hoạt động 2)
const User = require("../models/User");

// ✅ Lấy danh sách tất cả user – chỉ Admin được quyền xem
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Thêm user mới – chỉ Admin có quyền thêm (nếu cần)
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email đã tồn tại!" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "Thêm user thành công", newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cập nhật thông tin user – Admin hoặc chính chủ được phép sửa
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Nếu không phải admin và không phải chính chủ → cấm
    if (req.user.role !== "admin" && req.user.userId !== id) {
      return res.status(403).json({ message: "Không có quyền cập nhật user này!" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser)
      return res.status(404).json({ message: "User không tồn tại" });

    res.json({ message: "Cập nhật thành công", updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Xóa user – chỉ Admin mới được phép xóa
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Chỉ Admin mới được xóa user!" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User không tồn tại" });

    res.json({ message: "Đã xóa user thành công", deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
