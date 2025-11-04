import React, { useState } from "react";
import axios from "axios";

function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(""); // có thể lấy từ localStorage nếu muốn
  const [msg, setMsg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("token"); // nếu route có middleware protect

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !email) {
      setMsg("⚠️ Vui lòng chọn ảnh và nhập email!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ backend trả về: { message, avatarUrl, user }
      setMsg(res.data.message);
      setImageUrl(res.data.avatarUrl); // ⚡ Đúng key backend trả về
    } catch (err) {
      console.error("❌ Upload error:", err);
      setMsg("❌ Lỗi kết nối server hoặc upload thất bại!");
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
          style={{ padding: "8px", width: "250px" }}
        /><br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        /><br /><br />

        <button type="submit" style={{ padding: "8px 16px" }}>
          Tải lên
        </button>
      </form>

      <p
        style={{
          marginTop: 20,
          color: msg.includes("❌") ? "red" : "green",
          fontWeight: "bold",
        }}
      >
        {msg}
      </p>

      {imageUrl && (
        <div>
          <h4>Ảnh đại diện mới:</h4>
          <img
            src={imageUrl}
            alt="avatar"
            width="150"
            style={{
              borderRadius: "50%",
              border: "2px solid #ccc",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadAvatar;
