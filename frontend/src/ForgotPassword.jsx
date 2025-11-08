import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMsg(res.data.message || "✅ Đã gửi link đặt lại mật khẩu!");
    } catch {
      setMsg("❌ Lỗi kết nối server!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🔑 Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Gửi link</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
