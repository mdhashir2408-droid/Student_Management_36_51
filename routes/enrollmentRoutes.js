const express = require('express');
const router = express.Router();
const {
  enrollStudent,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
  dropCourse,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// @route   POST /api/enrollments
// @desc    Enroll student in course
// @access  Private
// @route   GET /api/enrollments
// @desc    Get all enrollments
// @access  Private/Admin/Teacher
router
  .route('/')
  .post(protect, enrollStudent)
  .get(protect, authorizeRoles('admin', 'teacher'), getEnrollments);

// @route   GET /api/enrollments/:id
// @desc    Get enrollment by ID
// @access  Private
// @route   PUT /api/enrollments/:id
// @desc    Update enrollment grade/status
// @access  Private/Admin/Teacher
// @route   DELETE /api/enrollments/:id
// @desc    Drop course enrollment
// @access  Private
router
  .route('/:id')
  .get(protect, getEnrollmentById)
  .put(protect, authorizeRoles('admin', 'teacher'), updateEnrollment)
  .delete(protect, dropCourse);

module.exports = router;
