const express = require('express');
const router = express.Router();
const { getFields, getFieldById, createField, updateField, deleteField, getAssignedFields } = require('../controllers/fieldController');
const { addUpdate } = require('../controllers/updateController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// Agent specific route
router.get('/assigned', protect, getAssignedFields);
router.post('/:id/update', protect, addUpdate);

// Admin routes
router.get('/', protect, adminOnly, getFields);
router.post('/', protect, adminOnly, createField);
router.get('/:id', protect, adminOnly, getFieldById);
router.put('/:id', protect, adminOnly, updateField);
router.delete('/:id', protect, adminOnly, deleteField);

module.exports = router;
