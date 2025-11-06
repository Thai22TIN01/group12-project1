const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 🟢 Phân quyền người dùng (có thể là user / admin / moderator)
  role: {
    type: String,
    enum: ["user", "admin", "moderator"], // chỉ cho phép 3 loại
    default: "user",
  },

  // 🖼️ Avatar người dùng (mặc định Cloudinary)
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dxdwi45r3/image/upload/v1730100000/default-avatar.png",
  },

  // 🔑 Token reset mật khẩu
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
