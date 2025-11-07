import React, { useEffect, useState } from "react";
import API from "./api";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  // 🟢 Lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Lỗi tải danh sách:", err);
        setError("Không thể lấy danh sách người dùng (token có thể đã hết hạn).");
      }
    };
    if (token) fetchUsers();
  }, [token]);

  // 🗑️ Xóa user (chỉ admin)
  const handleDelete = async (id) => {
    if (role !== "admin") return alert("🚫 Chỉ admin mới được xóa người dùng!");
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này không?")) return;

    try {
      await API.delete(`/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Đã xóa thành công!");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("Không thể xóa người dùng!");
    }
  };

  // ✏️ Sửa tên user
  const handleEdit = async (user) => {
    const newName = prompt("Nhập tên mới cho người dùng:", user.name);
    if (!newName) return;

    try {
      await API.put(
        `/users/${user._id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Cập nhật thành công!");
      setUsers(users.map((u) => (u._id === user._id ? { ...u, name: newName } : u)));
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("Không thể cập nhật người dùng!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>👑 Quản lý người dùng (Admin)</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li key={u._id} style={{ marginBottom: "10px" }}>
              👤 <b>{u.name}</b> — {u.email} — {u.role}
              {role === "admin" && (
                <>
                  <button
                    onClick={() => handleEdit(u)}
                    style={{
                      marginLeft: 10,
                      padding: "3px 8px",
                      borderRadius: "5px",
                    }}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{
                      marginLeft: 5,
                      color: "white",
                      backgroundColor: "red",
                      border: "none",
                      padding: "3px 8px",
                      borderRadius: "5px",
                    }}
                  >
                    🗑️ Xóa
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
