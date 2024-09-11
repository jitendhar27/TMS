const express = require('express');
const router = express.Router();

const Hotel = require('../Models/hotelModel');

// POSTING HOTEL
router.post("/",async(req,res)=> {
    try {
        console.log("Hotel Post Router");
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(200).json(hotel);
        
    } catch (error) {
        res.status(400).json({message : error.message});
    }
});


// GET HOTEL - READING
router.get("/", async(req,res)=> {
    try {
        console.log("INSIDE GET");

        const hotels = await Hotel.find();
        res.json(hotels);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


// FETCH SPECIFIC HOTEL DATA BASED ON ID
async function getHotel(req,res,next){
    let hotel;
    try {
        hotel = Hotel.findById(req.params.id);
        if(hotel==null){
            return res.status(404).json({message: "Can not find HOTEL"});
        }

    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.hotel = hotel;
    next();
}


// FETCH SPECIFIC HOTEL DATA BASED ON hotelNumber
async function getHotelByNumber(req, res, next) {
    let hotel;
    try {
      hotel = await Hotel.findOne({ hotelNumber: req.params.hotelNumber });
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.hotel = hotel;
    next();
  }
  
  // Now, update the route to use the new middleware for getting hotel by hotelNumber
  router.get('/hotelNumber/:hotelNumber', getHotelByNumber, (req, res) => {
    res.json(res.hotel);
  });
  





// DELETE HOTEL FUNCTION
router.delete("/:id", getHotel, async(req,res)=> {
    try {
        const id = req.params.id;
        await Hotel.deleteOne({_id: id})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// UPDATE USING ID
router.patch("/:id", getHotel, async(req,res)=>{
    try {

        // finding by id
        const hotel = await Hotel.findById(req.params.id);

        // updating
        hotel.hotelNumber = req.body.hotelNumber;
        hotel.hotelName = req.body.hotelName;
        hotel.hotelLocation = req.body.hotelLocation;
        hotel.hotelRating = req.body.hotelRating;
        hotel.hotelAminities = req.body.hotelAminities;
        hotel.email = req.body.email;

        // storing / saving this updated data
        const newHotel = await hotel.save();

        res.status(201).json(newHotel);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})













module.exports = router;