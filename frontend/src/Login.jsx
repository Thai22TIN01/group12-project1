import React, { useState } from "react";
import API from "./api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);
      alert("✅ Đăng nhập thành công!");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Lỗi đăng nhập");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Đăng xuất thành công!");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🔑 Đăng nhập</h2>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br />
      <button onClick={handleLogin}>Đăng nhập</button>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
