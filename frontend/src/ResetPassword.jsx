import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
  email,
  token,
  newPassword,
})
      setMessage(res.data.message || "Đặt lại mật khẩu thành công!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Lỗi kết nối server");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔒 Đặt lại mật khẩu</h2>
      <p>Email: <b>{email}</b></p>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Xác nhận</button>
      </form>
      <p style={{ color: "green" }}>{message}</p>
    </div>
  );
}
