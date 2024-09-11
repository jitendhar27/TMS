const express = require('express');
const router = express.Router();

const Customer = require('../Models/customerModel');


async function getCustomer(req, res, next){
    let customer;

    try {

        customer = await Customer.findById(req.params.id);
        if(customer == null){
            return res.status(404).json({message: "Customer Profile is not found"});
        }
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.customer = customer;
    next();
}


// GETTING ALL CUSTOMERS DATA
router.get('/',async(req,res)=> {
    try {

        const customer = await Customer.find();
        res.json(customer);
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// POST CUSTOMERS DATA
router.post('/', async(req,res) => {
    try {
        
        const customer = new Customer(req.body);
        await customer.save();
        res.status(200).json(customer);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});


// FETCH DATA BY ID
router.get('/:id', getCustomer, (req,res)=> {
    res.json((res.customer));

});


// UPDATE EXISTING CUSTOMER DATA BY FETCHING WITH ID
router.put('/:id', getCustomer, async(req, res)=> {
    if(req.body.CustomerName != null){
        res.customer.CustomerName = req.body.CustomerName;
    }

    if(req.body.CustomerPhone != null){
        res.customer.CustomerPhone = req.body.CustomerPhone;
    }

    if(req.body.CustomerEmail != null){
        res.customer.CustomerEmail = req.body.CustomerEmail;
    }

    if(req.body.CustomerAddress != null){
        res.customer.CustomerAddress = req.body.CustomerAddress;
    }

    if(req.body.CustomerAge != null){
        res.customer.CustomerAge = req.body.CustomerAge;
    }

    if(req.body.tourNumber != null){
        res.customer.tourNumber = req.body.tourNumber;
    }

    try {

        const updatedData = await res.customer.save();
        res.json(updatedData);
   
    } catch (error) {
        return res.status(400).json({message: error.message});
    }

    

});


// DELETE EXISTING CUSTOMER DATA BY FETCHING WITH ID
router.delete('/:id', getCustomer, async(req,res)=> {
    try {

        await res.customer.deleteOne();
        return res.json({message: "Customer profile is deleted"});
        
    } catch (error) {
        return res.status().json({message: error.message});
    }
});
















module.exports = router;