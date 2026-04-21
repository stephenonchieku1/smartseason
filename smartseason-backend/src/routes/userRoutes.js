const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/', protect, adminOnly, getUsers);
// POST /api/users can just be auth/register but handled by admin, let's add it here
const { register } = require('../controllers/authController');
router.post('/', protect, adminOnly, register);

module.exports = router;
