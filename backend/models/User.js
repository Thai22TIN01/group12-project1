const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },

  // 🆕 Thêm trường avatar
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dxdwi45r3/image/upload/v1730100000/default-avatar.png",
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
