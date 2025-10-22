// Mảng tạm chứa danh sách user
let users = [
  { id: 1, name: "Thái", email: "thai@gmail.com" },
  { id: 2, name: "Vinh", email: "vinh@gmail.com" },
  { id: 3, name: "Quy", email: "quy@gmail.com" }
];

// GET: Lấy danh sách user
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST: Thêm user mới
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" });

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ message: "Thêm user thành công", newUser });
};

// PUT: Cập nhật thông tin user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id == id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// DELETE: Xóa user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id != id);
  res.json({ message: "User deleted" });
};