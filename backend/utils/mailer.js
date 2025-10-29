const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Lỗi cấu hình Gmail:", error);
  } else {
    console.log("✅ Gmail sẵn sàng gửi mail!");
  }
});

module.exports = transporter;
