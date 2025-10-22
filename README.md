#  Nhóm 12 – CRUD MERN Application


**Môn học:** Phát triển phần mềm nhóm (Buổi 4)  
**Giảng viên hướng dẫn: Võ Thanh Vinh  
**Nhóm thực hiện:** Nhóm 12  
**Thời gian thực hiện xong:** 10/2025  

---

-- Giới thiệu dự án--

Dự án **CRUD MERN Application** là một ứng dụng web đơn giản cho phép **quản lý người dùng** (User Management) với các chức năng cơ bản:
-  Thêm người dùng (Create)
-  Hiển thị danh sách người dùng (Read)
-  Chỉnh sửa thông tin (Update)
-  Xóa người dùng (Delete)

Ứng dụng được xây dựng theo mô hình **MERN Stack**:
> **MongoDB – Express – React – Node.js**

---

##  Công nghệ sử dụng

| Thành phần | Công nghệ | Mô tả |
|-------------|------------|-------|
| **Frontend** | ReactJS, Axios, | Giao diện người dùng, gửi yêu cầu API |
| **Backend** | Node.js, ExpressJS | Xử lý API CRUD, kết nối MongoDB |
| **Database** | MongoDB Atlas | Lưu trữ dữ liệu người dùng trên cloud |
| **Công cụ** | Git, GitHub, VS Code, Postman | Quản lý mã nguồn & kiểm thử API |

---

##  Cấu trúc thư mục
group12-project/
│
├── backend/ # Mã nguồn backend (Node + Express)
│ ├── controllers/ # Xử lý logic CRUD
│ ├── routes/ # Khai báo API endpoint
│ ├── models/ # Định nghĩa schema MongoDB
│ └── server.js # File khởi chạy server
│
├── frontend/ # Mã nguồn frontend (React)
│ ├── src/
│ │ ├── components/ # Các component giao diện
│ │ ├── pages/ # Trang AddUser, UserList
│ │ └── App.js # Component chính
│ └── package.json # Cấu hình React
│
└── README.md # Mô tả dự án
