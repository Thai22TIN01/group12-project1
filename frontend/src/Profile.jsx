import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  // Lấy thông tin user từ backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email });
      } catch (err) {
        alert("Không lấy được thông tin user");
      }
    };
    fetchProfile();
  }, [token]);

  // Cập nhật thông tin user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
    } catch (err) {
      alert("Lỗi cập nhật");
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>Thông tin cá nhân</h2>
      <p><b>Tên:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <form onSubmit={handleUpdate}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br/>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br/>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}
