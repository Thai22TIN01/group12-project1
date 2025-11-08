import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("accessToken");
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://group12-project1-zrv7.onrender.com/api/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi tải danh sách:", err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📋 Danh sách người dùng</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
