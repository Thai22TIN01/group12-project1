import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "./api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/reset-password", { email, token, newPassword: password });
      setMsg(res.data.message || "✅ Đặt lại mật khẩu thành công!");
    } catch {
      setMsg("❌ Lỗi kết nối server!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🔒 Đặt lại mật khẩu</h2>
      <p>Email: {email}</p>
      <form onSubmit={handleReset}>
        <input type="password" placeholder="Mật khẩu mới" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Xác nhận</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
