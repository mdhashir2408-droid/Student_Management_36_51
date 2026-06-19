const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    grade: {
      type: String,
      default: 'N/A',
    },
    status: {
      type: String,
      enum: ['Enrolled', 'Completed', 'Dropped'],
      default: 'Enrolled',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a student cannot be enrolled in the same course multiple times
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
