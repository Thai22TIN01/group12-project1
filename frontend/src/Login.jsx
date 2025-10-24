import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
      console.log("JWT Token:", res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đăng nhập");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Đăng xuất thành công!");
  };
//hello
  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>Đăng nhập</h2>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br/>
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br/>
      <button onClick={handleLogin}>Đăng nhập</button>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
