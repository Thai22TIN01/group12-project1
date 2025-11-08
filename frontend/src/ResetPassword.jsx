import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://group12-project1-zrv7.onrender.com/api/auth/reset-password",
        { email, token, newPassword }
      );
      setMsg(res.data.message || "✅ Đặt lại mật khẩu thành công!");
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Lỗi kết nối!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🔒 Đặt lại mật khẩu</h2>
      <p>Email: {email}</p>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        /><br />
        <button type="submit">Xác nhận</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
