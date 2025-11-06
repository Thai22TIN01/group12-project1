import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMsg(data.message || "Đã gửi yêu cầu!");
    } catch (err) {
      setMsg("Lỗi kết nối server");
      console.error("❌ Lỗi khi gửi yêu cầu quên mật khẩu:", err);
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
