const mongoose = require("mongoose");
const noteSchems = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
    maxlength: [40, "A note title must have less or equal then 40 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  important: {
    type: Boolean,
    default: false,
  },
  upDatedAt: {
    type: Date,
    default: null,
  },
});

const note = mongoose.model("note", noteSchems);
module.exports = note;
