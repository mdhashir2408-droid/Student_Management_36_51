const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// @route   POST /api/courses
// @desc    Create course
// @access  Private/Admin/Teacher
// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router
  .route('/')
  .post(protect, authorizeRoles('admin', 'teacher'), createCourse)
  .get(protect, getCourses);

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Private
// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private/Admin/Teacher
// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private/Admin
router
  .route('/:id')
  .get(protect, getCourseById)
  .put(protect, authorizeRoles('admin', 'teacher'), updateCourse)
  .delete(protect, authorizeRoles('admin'), deleteCourse);

module.exports = router;
