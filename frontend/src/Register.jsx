import React, { useState } from "react";
import api from "./api"; // ✅ import file cấu hình axios

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Tự động nhận backend Render hoặc localhost
      const res = await api.post("/auth/signup", form);

      alert(res.data.message || "Đăng ký thành công!");
      console.log("✅ User đăng ký:", res.data.user || form);
    } catch (err) {
      console.error("❌ Error:", err);
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
