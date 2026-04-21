const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register); // Normally admin only in production, but let's keep it open or protect it

module.exports = router;
