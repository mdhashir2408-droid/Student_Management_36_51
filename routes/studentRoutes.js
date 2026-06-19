const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// @route   POST /api/students
// @desc    Create student profile
// @access  Private/Admin
// @route   GET /api/students
// @desc    Get all students
// @access  Private/Admin/Teacher
router
  .route('/')
  .post(protect, authorizeRoles('admin'), createStudent)
  .get(protect, authorizeRoles('admin', 'teacher'), getStudents);

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
// @route   PUT /api/students/:id
// @desc    Update student profile
// @access  Private/Admin/Student
// @route   DELETE /api/students/:id
// @desc    Delete student profile
// @access  Private/Admin
router
  .route('/:id')
  .get(protect, getStudentById)
  .put(protect, authorizeRoles('admin', 'student'), updateStudent)
  .delete(protect, authorizeRoles('admin'), deleteStudent);

module.exports = router;
