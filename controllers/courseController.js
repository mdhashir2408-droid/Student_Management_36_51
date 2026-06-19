const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { courseCode, courseName, credits, teacherName } = req.body;

    // Validate fields
    if (!courseCode || !courseName || !credits || !teacherName) {
      return res.status(400).json({ message: 'All fields (courseCode, courseName, credits, teacherName) are required' });
    }

    // Check if course already exists
    const courseExists = await Course.findOne({ courseCode });
    if (courseExists) {
      return res.status(400).json({ message: 'Course code already exists' });
    }

    const course = await Course.create({
      courseCode,
      courseName,
      credits,
      teacherName,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course details
const updateCourse = async (req, res) => {
  try {
    const { courseCode, courseName, credits, teacherName } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the new courseCode is already used by another course
    if (courseCode && courseCode !== course.courseCode) {
      const courseExists = await Course.findOne({ courseCode });
      if (courseExists) {
        return res.status(400).json({ message: 'Course code already exists' });
      }
      course.courseCode = courseCode;
    }

    if (courseName !== undefined) course.courseName = courseName;
    if (credits !== undefined) course.credits = credits;
    if (teacherName !== undefined) course.teacherName = teacherName;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
