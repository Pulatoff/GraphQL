const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: [true, "Siz ismingizni kiritishingiz shart"],
    unique: true,
  },
  numberStudents: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("School", SchoolSchema);
