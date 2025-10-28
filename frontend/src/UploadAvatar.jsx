import React, { useState } from "react";

function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(""); // 🆕 nhập hoặc lấy từ localStorage
  const [msg, setMsg] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email) {
      setMsg("Vui lòng chọn ảnh và nhập email!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMsg(data.message);
      setImageUrl(data.url);
    } catch (err) {
      setMsg("Lỗi kết nối server!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🖼️ Upload Avatar</h2>
      <form onSubmit={handleUpload}>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br /><br />
        <button type="submit">Tải lên</button>
      </form>
      <p>{msg}</p>

      {imageUrl && (
        <div>
          <h4>Ảnh đại diện mới:</h4>
          <img src={imageUrl} alt="avatar" width="150" style={{ borderRadius: "50%" }} />
        </div>
      )}
    </div>
  );
}

export default UploadAvatar;
