const express = require('express');
const app = express();

// Middleware cho phép backend đọc dữ liệu JSON
app.use(express.json());

// Cấu hình PORT (ưu tiên biến môi trường, mặc định 3000)
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
