import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Gọi API POST để thêm user
  const addUser = async () => {
    if (!name || !email) return alert("Vui lòng nhập đủ thông tin!");
    try {
      await axios.post("http://localhost:5000/api/users", { name, email });
      alert("✅ Thêm user thành công!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("❌ Lỗi khi thêm user:", error);
      alert("Không thể thêm user, vui lòng kiểm tra server!");
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
      <h2>➕ Thêm người dùng</h2>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={addUser}>Thêm</button>
    </div>
  );
}

export default AddUser;
