const mongoose = require("mongoose");

const qnaSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

module.exports = mongoose.model("qnaSchema", qnaSchema);
