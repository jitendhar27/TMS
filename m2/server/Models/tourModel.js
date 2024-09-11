const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({

    //tour details
    tourName: String,
    tourNumber: Number,
    tourDescription: String,
    tourPrice: Number,   
    
    // hotel details
    hotelName: String,
    hotelRating: Number,
    hotelAminities: String,
});

module.exports = mongoose.model('tourSchema',tourSchema);