const User = require('../models/User');

// GET: Lấy danh sách user từ MongoDB
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: Thêm user vào MongoDB
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" });

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: "Thêm user thành công", newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
