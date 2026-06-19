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

// Protect all routes using auth middleware
router.use(protect);

// @route   POST /api/students
// @desc    Create student profile
// @access  Private
// @route   GET /api/students
// @desc    Get all students
// @access  Private
router
  .route('/')
  .post(createStudent)
  .get(getStudents);

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
// @route   PUT /api/students/:id
// @desc    Update student profile
// @access  Private
// @route   DELETE /api/students/:id
// @desc    Delete student profile
// @access  Private
router
  .route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;

