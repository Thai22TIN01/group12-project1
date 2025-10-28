import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Gọi API backend (port 5000)
      const res = await axios.post("http://localhost:5000/register", form);
      alert(res.data.message || "Đăng ký thành công!");
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi kết nối server");
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
      <h2>Đăng ký</h2>
      <input
        placeholder="Tên"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br />
      <button onClick={handleSubmit}>Đăng ký</button>
    </div>
  );
}
