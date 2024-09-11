const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  
    
    // hotel details
    hotelNumber: Number,
    hotelName: String,
    hotelLocation: String,
    hotelRating: Number,
    hotelAminities: String,
    email: String,
    password: String
});

module.exports = mongoose.model('hotelSchema',hotelSchema);