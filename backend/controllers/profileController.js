const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

// 🟢 Xem thông tin cá nhân (GET /profile)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // bỏ mật khẩu
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Cập nhật thông tin cá nhân (PUT /profile)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json({ message: "Cập nhật thành công!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Upload avatar (POST /profile/upload-avatar)
exports.uploadAvatar = async (req, res) => {
  try {
    const file = req.file.path; // lấy đường dẫn ảnh từ multer
    const result = await cloudinary.uploader.upload(file, {
      folder: "avatars",
      use_filename: true,
    });

    // Cập nhật URL ảnh vào user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true }
    );

    res.json({
      message: "Upload avatar thành công!",
      avatarUrl: result.secure_url,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
