import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  // Gọi API GET để lấy danh sách user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
      <h2>📋 Danh sách người dùng</h2>
      <ul>
        {users.map((u) => (
          // ⚠️ MongoDB dùng "_id" chứ không phải "id"
          <li key={u._id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
