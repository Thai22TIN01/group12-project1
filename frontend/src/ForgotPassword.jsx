import React, { useState } from "react";
import api from "./api"; // ✅ Dùng cấu hình axios chung

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Gọi API qua axios, tự động đổi giữa localhost và Render
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.data.message || "✅ Đã gửi yêu cầu đặt lại mật khẩu!");
    } catch (err) {
      console.error("❌ Lỗi khi gửi yêu cầu quên mật khẩu:", err);
      setMsg(err.response?.data?.message || "❌ Lỗi kết nối máy chủ");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🔑 Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi link reset</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default ForgotPassword;
