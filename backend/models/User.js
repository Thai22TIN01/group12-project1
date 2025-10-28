const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  // 🟢 Thêm trường avatar (Buổi 6 - Hoạt động 3)
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/demo/image/upload/v1720000000/default-avatar.png",
  },
});

module.exports = mongoose.model("User", userSchema);
