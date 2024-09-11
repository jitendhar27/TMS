const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  tourName: String,
  tourRating: Number,
  tourReview: String,
});

module.exports = mongoose.model("feedbackSchema", feedbackSchema);
