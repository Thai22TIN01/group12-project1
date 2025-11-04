import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  // 🟢 Lấy thông tin user từ backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email });
      } catch (err) {
        alert("❌ Không lấy được thông tin user");
      }
    };
    fetchProfile();
  }, [token]);

  // 🟢 Cập nhật thông tin user
 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put("http://localhost:5000/api/profile", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(res.data.message);
  } catch (err) {
    alert("❌ Lỗi cập nhật thông tin");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>🧍‍♂️ Thông tin cá nhân</h2>

      {/* 🖼️ Avatar hiển thị (lấy từ MongoDB) */}
      <div style={{ marginBottom: 20 }}>
        <img
          src={
            user.avatar
              ? user.avatar
              : "https://res.cloudinary.com/dxdwi45r3/image/upload/v1730100000/default-avatar.png"
          }
          alt="Avatar"
          width="150"
          height="150"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #888",
          }}
        />
      </div>

      {/* 🧩 Thông tin */}
      <p><b>Tên:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      {/* ✏️ Form cập nhật */}
      <form onSubmit={handleUpdate}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nhập tên mới"
          style={{ width: "250px", padding: "8px", marginBottom: "10px" }}
        /><br />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Nhập email mới"
          style={{ width: "250px", padding: "8px", marginBottom: "10px" }}
        /><br />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Cập nhật
        </button>
      </form>
    </div>
  );
}
