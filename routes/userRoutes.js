const express = require('express');
const router = express.Router();
const { getUserProfile, getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, authorizeRoles('admin'), getUsers);

module.exports = router;
