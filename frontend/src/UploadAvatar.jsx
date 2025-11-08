import React, { useState } from "react";
import axios from "axios";
import api from "./api";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);

    try {
      const res = await axios.post(
        "https://group12-project1-zrv7.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(res.data.message);
      setImageUrl(res.data.avatarUrl);
    } catch {
      setMsg("❌ Upload thất bại!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🖼️ Upload Avatar</h2>
      <form onSubmit={handleUpload}>
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br />
        <button type="submit">Tải lên</button>
      </form>
      <p>{msg}</p>
      {imageUrl && <img src={imageUrl} alt="avatar" width="120" />}
    </div>
  );
}
