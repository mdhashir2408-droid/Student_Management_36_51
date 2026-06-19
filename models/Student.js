const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: String,
      required: [true, 'Enrollment number is required'],
      unique: true,
    },
    rollNo: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
    },
    department: {
      type: String,
    },
    semester: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', studentSchema);

