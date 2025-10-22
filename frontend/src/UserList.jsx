import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  // 🔹 1. Hàm lấy danh sách user từ MongoDB
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách:", err);
      alert("Không thể tải danh sách người dùng!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 2. Hàm XÓA user (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này không?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("🗑️ Xóa thành công!");
      fetchUsers(); // load lại danh sách
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("Không thể xóa người dùng!");
    }
  };

  // 🔹 3. Hàm SỬA user (PUT)
  const handleEdit = async (user) => {
    const newName = prompt("Nhập tên mới:", user.name);
    if (!newName) return;
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, {
        name: newName,
      });
      alert("✏️ Cập nhật thành công!");
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi sửa:", err);
      alert("Không thể sửa người dùng!");
    }
  };

  return (
    <div style={{ width: "500px", margin: "auto", textAlign: "center" }}>
      <h2>📋 Danh sách người dùng</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => handleEdit(u)}>Sửa</button>
            <button onClick={() => handleDelete(u._id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
