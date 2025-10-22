import React, { useState, useEffect } from "react";
import axios from "axios";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Lấy danh sách user từ MongoDB
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý validation & thêm user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trống
    if (!name.trim()) {
      alert("⚠️ Name không được để trống");
      return;
    }

    // Kiểm tra định dạng email
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("⚠️ Email không hợp lệ");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", { name, email });
      alert("✅ Thêm user thành công!");
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("❌ Lỗi khi thêm user:", error);
      alert("Không thể thêm user. Kiểm tra lại server!");
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
      <h2>➕ Thêm người dùng (có Validation)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">Thêm</button>
      </form>

      <h3>📋 Danh sách người dùng</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddUser;
