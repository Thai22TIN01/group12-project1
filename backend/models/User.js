const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // 🟢 Thêm trường role để phân quyền nâng cao (Buổi 6 - Hoạt động 2)
  role: {
    type: String,
    enum: ["user", "admin", "moderator"], // chỉ cho phép 3 giá trị này
    default: "user", // mặc định là user
  },
});

module.exports = mongoose.model("User", userSchema);
