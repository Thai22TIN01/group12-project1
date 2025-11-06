import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role"); // lấy role hiện tại

  // 🟢 Lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Token không hợp lệ hoặc đã hết hạn!");
      }
    };
    fetchUsers();
  }, [token]);

  // 🟠 Hàm xóa user
  const handleDelete = async (id) => {
    if (role !== "admin") {
      alert("🚫 Chỉ admin mới được xóa người dùng!");
      return;
    }
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("🗑️ Đã xóa thành công!");
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        alert("❌ Lỗi khi xóa người dùng!");
      }
    }
  };

  // ✏️ Hàm sửa tên user
  const handleEdit = async (user) => {
    const newName = prompt("Nhập tên mới cho người dùng:", user.name);
    if (!newName) return;
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Cập nhật thành công!");
      setUsers(
        users.map((u) => (u._id === user._id ? { ...u, name: newName } : u))
      );
    } catch (err) {
      alert("❌ Không thể cập nhật người dùng!");
    }
  };

  // 🧩 Render giao diện
  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2>👑 Danh sách người dùng (Admin)</h2>
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((u) => (
          <li key={u._id} style={{ marginBottom: 10 }}>
            {u.name} - {u.email} - {u.role}
            {role === "admin" && (
              <>
                <button
                  onClick={() => handleEdit(u)}
                  style={{ marginLeft: 10, padding: "4px 10px" }}
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  style={{
                    marginLeft: 5,
                    padding: "4px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  🗑️ Xóa
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
