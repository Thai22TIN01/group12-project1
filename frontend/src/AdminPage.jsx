import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://group12-project1-zrv7.onrender.com/api/admin/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    };
    fetch();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa người dùng này?")) return;
    await axios.delete(
      `https://group12-project1-zrv7.onrender.com/api/admin/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>👑 Quản lý người dùng</h2>
      {users.map((u) => (
        <div key={u._id}>
          {u.name} — {u.email} — {u.role}
          <button onClick={() => handleDelete(u._id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}
