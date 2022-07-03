const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Siz ismingizno kirishingiz kire"],
  },
  gender: {
    type: String,
    required: [true, "Siz genderzni tanlashngiz kerak"],
  },
  school: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
});

module.exports = mongoose.model("Person", PersonSchema);
