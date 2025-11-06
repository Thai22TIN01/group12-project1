import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Lấy token và role từ localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" | "moderator" | "user"

  // 🔹 1. Hàm lấy danh sách user từ MongoDB
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách:", err);
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Không thể tải danh sách người dùng!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 2. Hàm XÓA user (chỉ admin được phép)
  const handleDelete = async (id) => {
    if (role !== "admin") {
      alert("🚫 Bạn không có quyền xóa người dùng!");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn xóa người dùng này không?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Xóa thành công!");
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("Không thể xóa người dùng!");
    }
  };

  // 🔹 3. Hàm SỬA user (admin hoặc moderator)
  const handleEdit = async (user) => {
    if (role !== "admin" && role !== "moderator") {
      alert("🚫 Bạn không có quyền sửa người dùng!");
      return;
    }

    const newName = prompt("Nhập tên mới:", user.name);
    if (!newName) return;

    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✏️ Cập nhật thành công!");
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi sửa:", err);
      alert("Không thể sửa người dùng!");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Đang tải danh sách...</p>;

  return (
    <div style={{ width: "500px", margin: "auto", textAlign: "center" }}>
      <h2>📋 Danh sách người dùng</h2>

      {users.length === 0 ? (
        <p>Không có người dùng nào!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li key={u._id} style={{ marginBottom: "10px" }}>
              <span>
                👤 <b>{u.name}</b> — {u.email}
              </span>

              {/* ✅ Chỉ hiện nút sửa/xóa khi có quyền */}
              {(role === "admin" || role === "moderator") && (
                <button
                  onClick={() => handleEdit(u)}
                  style={{ marginLeft: 10 }}
                >
                  ✏️ Sửa
                </button>
              )}

              {role === "admin" && (
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
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
