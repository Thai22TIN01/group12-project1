const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/userController');

// GET: Lấy danh sách user
router.get('/users', getUsers);

// POST: Thêm user mới
router.post('/users', addUser);

module.exports = router;
