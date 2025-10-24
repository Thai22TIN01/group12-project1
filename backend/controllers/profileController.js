const User = require("../models/User");

// Xem thông tin cá nhân
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
      res.json({ message: "Cập nhật thành công!", user });
    } else {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
