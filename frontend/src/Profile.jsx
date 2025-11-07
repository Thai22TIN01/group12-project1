import React, { useEffect, useState } from "react";
import API from "./api";

export default function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile", { headers: { Authorization: `Bearer ${token}` } });
        const userData = res.data.user || res.data;
        setUser(userData);
        setForm({ name: userData.name, email: userData.email });
      } catch {
        alert("Không lấy được thông tin người dùng!");
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/profile", form, { headers: { Authorization: `Bearer ${token}` } });
      alert(res.data.message || "✅ Cập nhật thành công!");
    } catch {
      alert("Không thể cập nhật!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🧍 Hồ sơ cá nhân</h2>
      <img src={user.avatar || "https://res.cloudinary.com/dxdwi45r3/image/upload/v1730100000/default-avatar.png"} alt="avatar" width="150" height="150" style={{ borderRadius: "50%" }} />
      <p><b>Tên:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <form onSubmit={handleUpdate}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}
