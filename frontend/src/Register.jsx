import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi kết nối server");
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>Đăng ký</h2>
      <input placeholder="Tên" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br/>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br/>
      <input type="password" placeholder="Mật khẩu" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br/>
      <button onClick={handleSubmit}>Đăng ký</button>
    </div>
  );
}
