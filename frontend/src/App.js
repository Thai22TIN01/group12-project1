import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddUser from "./AddUser";
import UserList from "./UserList";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import AdminPage from "./AdminPage"; // 🆕 thêm trang Quản lý User (Admin)

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>🧩 Group12 - CRUD & Authentication & Profile & Admin</h2>
        <nav>
          <Link to="/">Danh sách</Link> |{" "}
          <Link to="/add">Thêm user</Link> |{" "}
          <Link to="/register">Đăng ký</Link> |{" "}
          <Link to="/login">Đăng nhập</Link> |{" "}
          <Link to="/profile">Hồ sơ cá nhân</Link> |{" "}
          <Link to="/admin">Admin</Link> {/* 🆕 link tới trang Admin */}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} /> {/* 🆕 route mới */}
      </Routes>
    </Router>
  );
}

export default App;
