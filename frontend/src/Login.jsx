import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://group12-project1-zrv7.onrender.com/api/auth/login",
        form
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("✅ Đăng nhập thành công!");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Lỗi đăng nhập");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🔑 Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br/>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br/>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
