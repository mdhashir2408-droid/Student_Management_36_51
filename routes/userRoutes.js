const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Protect all routes
router.use(protect);

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.route('/').get(getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
// @route   PUT /api/users/:id
// @desc    Update user details
// @access  Private/Admin
// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router
  .route('/:id')
  .get(getUserById)
  .put(authorizeRoles('admin'), updateUser)
  .delete(authorizeRoles('admin'), deleteUser);

module.exports = router;

