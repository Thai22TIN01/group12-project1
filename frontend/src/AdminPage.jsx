import React, { useEffect, useState } from "react";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);       // ✅ nếu là mảng, hiển thị danh sách
        } else {
          setError(data.message || "Không có quyền truy cập!");
        }
      })
      .catch((err) => setError("Lỗi kết nối server!"));
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa user này?")) {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  // 🟢 Nếu có lỗi (không phải admin)
  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        <h2>🚫 {error}</h2>
        <p>Vui lòng đăng nhập bằng tài khoản Admin để truy cập trang này.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>👑 Quản lý người dùng (Admin)</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "admin" && (
                  <button onClick={() => handleDelete(u._id)}>Xóa</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
