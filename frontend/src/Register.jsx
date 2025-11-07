import React, { useState } from "react";
import API from "./api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      alert(res.data.message || "✅ Đăng ký thành công!");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Lỗi kết nối server");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📝 Đăng ký</h2>
      <input placeholder="Tên" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />
      <button onClick={handleSubmit}>Đăng ký</button>
    </div>
  );
}
