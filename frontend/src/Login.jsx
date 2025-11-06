import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ Gọi đúng endpoint backend
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // ✅ Lưu Access + Refresh Token và thông tin user
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      alert("✅ Đăng nhập thành công!");
      console.log("Access Token:", res.data.accessToken);
      console.log("Role:", res.data.user.role);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Lỗi đăng nhập");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    alert("Đăng xuất thành công!");
  };

  return (
    <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
      <h2>🔑 Đăng nhập</h2>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br />
      <input
        type="password"
        placeholder="Mật khẩu"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /><br />
      <button onClick={handleLogin}>Đăng nhập</button>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
