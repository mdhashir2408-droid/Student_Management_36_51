const Student = require('../models/Student');

// @route   POST /api/students
// @desc    Create student profile
// @access  Private
const createStudent = async (req, res) => {
  const { enrollmentNo, rollNo, name, department, semester, email, phone } = req.body;

  try {
    if (!enrollmentNo || !name) {
      return res.status(400).json({ message: 'Enrollment number and name are required' });
    }

    const studentExists = await Student.findOne({ enrollmentNo });
    if (studentExists) {
      return res.status(400).json({ message: 'Student with this enrollment number already exists' });
    }

    const student = await Student.create({
      enrollmentNo,
      rollNo,
      name,
      department,
      semester,
      email,
      phone,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/students
// @desc    Get all students
// @access  Private
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/students/:id
// @desc    Update student details
// @access  Private
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.enrollmentNo = req.body.enrollmentNo || student.enrollmentNo;
    student.rollNo = req.body.rollNo || student.rollNo;
    student.name = req.body.name || student.name;
    student.department = req.body.department || student.department;
    student.semester = req.body.semester || student.semester;
    student.email = req.body.email || student.email;
    student.phone = req.body.phone || student.phone;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/students/:id
// @desc    Delete student profile
// @access  Private
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

