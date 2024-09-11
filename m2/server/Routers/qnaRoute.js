const express = require('express');
const router = express.Router();

const QnA = require('../Models/qnaModel');

// POSTING QUESTION 
router.post("/",async(req,res)=> {
    try {
        const question = new QnA(req.body);
        await question.save();
        res.status(200).json(question);
        
    } catch (error) {
        res.status(400).json({message : error.message});
    }
});

// GET QNA - READING
router.get("/", async(req,res)=> {
    try {
        const qna = await QnA.find();
        res.json(qna);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


// customized function (get by id)
async function getQnA(req, res, next){
    let qna;
    try {
        // we'll find by also qna number also
        qna = await QnA.findById(req.params.id);
        if(qna==null){
            return res.status(404).json({message:"Record not found"});
        }
    } catch (error) {
        return res.status(400).json({message:error.message});
    }

    res.qna = qna;
    next();
}

router.get('/:id', getQnA, async(req,res)=>{
    res.json(res.qna);
});


// UPDATING QNA BY USING OBJECT ID
router.put('/:id',getQnA, async(req,res)=> {

    // checking whether the fields are null or not 
    // updating when fields are not null
    if(req.body.question != null){
        res.qna.question = req.body.question;
    };

    if(req.body.answer != null){
        res.qna.answer = req.body.answer;
    };

    try {
        const updatedQnA = await res.qna.save();
        res.json(updatedQnA);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});


module.exports = router;