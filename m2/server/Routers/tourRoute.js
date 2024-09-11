const express = require('express');
const router = express.Router();
//m2
const csvtojson = require('csvtojson');
const multer = require('multer');   //

const Tours = require('../Models/tourModel');


// POSTING / INSERTING A SINGLE TOUR
router.post('/', async(req,res)=> {
    try {
        const tour = new Tours(req.body);
        await tour.save();
        res.status(200).json(tour);
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});


// READNG / GETTING / VIEWING ALL TOURS
router.get('/',async(req,res) => {
    try {
        const tour = await Tours.find();
        res.json(tour);

    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

// customized function (get by id)
async function getTours(req, res, next){
    let tour;
    try {
        // we'll find by also tour number also
        tour = await Tours.findById(req.params.id);
        if(tour==null){
            return res.status(404).json({message:"Record not found"});
        }
    } catch (error) {
        return res.status(400).json({message:error.message});
    }

    res.tour = tour;
    next();
}

router.get('/:id', getTours, async(req,res)=>{
    res.json(res.tour);
});

//

// UPDATING TOUR BY USING OBJECT ID
router.put('/:id',getTours, async(req,res)=> {

    // checking whether the fields are null or not 
    // updating when fields are not null
    if(req.body.tourName != null){
        res.tour.tourName = req.body.tourName;
    };

    if(req.body.tourNumber != null){
        res.tour.tourNumber = req.body.tourNumber;
    };

    if(req.body.tourDescription != null){
        res.tour.tourDescription = req.body.tourDescription;
    };

    if(req.body.tourPrice != null){
        res.tour.tourPrice = req.body.tourPrice;
    };

    if(req.body.hotelName != null){
        res.tour.hotelName = req.body.hotelName;
    };

    if(req.body.hotelRating != null){
        res.tour.hotelRating = req.body.hotelRating;
    };

    if(req.body.hotelAminities != null){
        res.tour.hotelAminities = req.body.hotelAminities;
    };


    try {
        const updatedTour = await res.tour.save();
        res.json(updatedTour);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});


// DELETING TOUR BY USING OBJECT ID
router.delete('/:id', getTours, async(req,res)=> {
    try {
        await res.tour.deleteOne();
        res.json({message:"Tour is Deleted successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})


// m2
// BULK UPLOADING FROM CSV FILE 
// have to give file loc
const storage = multer.memoryStorage();
const upload = multer({storage:storage.storage});

router.post('/upload',upload.single('file'), async(req,res)=>{
    if(!req.file){
        return res.status(400).json('No File Uploaded');
    }

    try {
        // converting csv file to json objects for bulk insertion of tours 
        const jsonarray = await csvtojson().fromString(req.file.buffer.toString());
        await Tours.insertMany(jsonarray);
        res.json({message:"CSV File Upload Successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


// Fetch a single tour by tourNumber
router.get('/by-tour-number/:tourNumber', async (req, res) => {
    const tourNumber = req.params.tourNumber;

    try {
        const tour = await Tours.findOne({ tourNumber }); // Assuming tourNumber is unique
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});













module.exports = router;