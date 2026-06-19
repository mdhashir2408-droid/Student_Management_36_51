const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Enroll a student in a course
const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId, grade, status } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: 'studentId and courseId are required' });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student is already enrolled in this course
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      grade,
      status,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({}).populate('studentId').populate('courseId');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enrollment by ID
const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('studentId').populate('courseId');
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update grade or status of enrollment
const updateEnrollment = async (req, res) => {
  try {
    const { grade, status } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (grade !== undefined) enrollment.grade = grade;
    if (status !== undefined) enrollment.status = status;

    const updatedEnrollment = await enrollment.save();
    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Drop a course/enrollment
const dropCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    await Enrollment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Enrollment removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollStudent,
  getEnrollments,
  getEnrollmentById,
  updateEnrollment,
  dropCourse,
};
