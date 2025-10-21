// Mảng tạm chứa danh sách user
let users = [
  { id: 1, name: "Thái", email: "thai@gmail.com" },
  { id: 2, name: "Vinh", email: "vinh@gmail.com" }
];

// Lấy danh sách user
exports.getUsers = (req, res) => {
  res.json(users);
};

// Thêm user mới
exports.addUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ message: "Thêm user thành công", newUser });
};
