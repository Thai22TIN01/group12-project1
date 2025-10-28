import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddUser from "./AddUser";
import UserList from "./UserList";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import AdminPage from "./AdminPage";
import ForgotPassword from "./ForgotPassword";
import UploadAvatar from "./UploadAvatar";
import ResetPassword from "./ResetPassword"; // ✅ Đặt lại mật khẩu

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>🧩 Group12 - CRUD | Auth | Profile | Admin | Advanced</h2>
        <nav>
          <Link to="/">Danh sách</Link> |{" "}
          <Link to="/add">Thêm user</Link> |{" "}
          <Link to="/register">Đăng ký</Link> |{" "}
          <Link to="/login">Đăng nhập</Link> |{" "}
          <Link to="/profile">Hồ sơ cá nhân</Link> |{" "}
          <Link to="/admin">Admin</Link> |{" "}
          <Link to="/forgot">Quên mật khẩu</Link> |{" "}
          <Link to="/upload">Upload Avatar</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/upload" element={<UploadAvatar />} />

        {/* ✅ Route mới để người dùng truy cập từ email */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
