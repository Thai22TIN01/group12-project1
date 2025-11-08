import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://group12-project1-zrv7.onrender.com/api/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userData = res.data.user || res.data;
        setUser(userData);
        setForm({ name: userData.name, email: userData.email });
      } catch {
        alert("❌ Không lấy được thông tin người dùng!");
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://group12-project1-zrv7.onrender.com/api/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "✅ Cập nhật thành công!");
    } catch {
      alert("❌ Không thể cập nhật thông tin!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>🧍 Hồ sơ cá nhân</h2>

      <img
        src={
          user.avatar ||
          "https://res.cloudinary.com/dxdwi45r3/image/upload/v1730100000/default-avatar.png"
        }
        alt="avatar"
        width="150"
        height="150"
        style={{
          borderRadius: "50%",
          border: "2px solid #888",
          objectFit: "cover",
        }}
      />

      <p><b>Tên:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <form onSubmit={handleUpdate}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nhập tên mới"
          style={{ marginBottom: 10 }}
        /><br />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Nhập email mới"
          style={{ marginBottom: 10 }}
        /><br />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}
