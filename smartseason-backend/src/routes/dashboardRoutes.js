const express = require('express');
const router = express.Router();
const { adminDashboard, agentDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.get('/admin', protect, adminOnly, adminDashboard);
router.get('/agent', protect, agentDashboard);

module.exports = router;
