const express = require('express');
const router = express.Router();

const Feedback = require('../Models/feedbackModel');

// POSTING FEEDBACK
router.post("/",async(req,res)=> {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(200).json(feedback);
        
    } catch (error) {
        res.status(400).json({message : error.message});
    }
});

// GET FEEDBACKS - READING
router.get("/", async(req,res)=> {
    try {
        

        const feedbacks = await Feedback.find();
        res.json(feedbacks);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});



module.exports = router;