const User = require("../models/User");

// ✅ GET: lấy danh sách user từ MongoDB
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ POST: thêm user mới
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Thiếu thông tin" });

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: "Thêm user thành công", newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ PUT: cập nhật user theo id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ message: "Cập nhật thành công", updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE: xóa user theo id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ message: "Đã xóa user", deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
