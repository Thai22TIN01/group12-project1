import React, { useState } from "react";
import API from "./api";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email) return setMsg("⚠️ Nhập email và chọn ảnh!");
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);
    try {
      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMsg(res.data.message);
      setUrl(res.data.avatarUrl);
    } catch {
      setMsg("❌ Lỗi upload hoặc server!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🖼️ Upload Avatar</h2>
      <form onSubmit={handleUpload}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} /><br />
        <button type="submit">Tải lên</button>
      </form>
      <p>{msg}</p>
      {url && <img src={url} alt="avatar" width="150" style={{ borderRadius: "50%" }} />}
    </div>
  );
}
