const express = require('express');
const router = express.Router();

const Users = require('../Models/userModel');


// GETTING USER DATA
router.get('/', async(req,res) => {
    try {
        const user1 = await Users.find();
        res.json(user1);
    } catch (error) {
        res.status(500).json({message: message.error});
    }
});

// REGISTRATION / POSTING FUNCTION
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Add any additional validation or checks here.

        const user1 = new Users({
            username: username,
            email: email,
            password: password,
            role: role
        });

        await user1.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});




// LOGIN FUNCTION
router.post('/login', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ username });
  
      // CHECKING USER EXISTS OR NOT
      if (user) {
        // CHECKING ENTERED EMAIL AND PASSWORD WITH DB EMAIL AND PASSWORD
        if (email === user.email && password === user.password) {
          // Assuming that the user has a 'role' field in the user document
          const userRole = user.role;
  
          if (userRole === 'customer' || userRole === 'hotelier' || userRole === 'admin') {
            return res.json({ success: true, role: userRole });
          } else {
            return res.status(400).json({ success: false, message: 'Invalid user role' });
          }
        } else {
          return res.status(400).json({ success: false, message: 'Wrong credentials' });
        }
      } else {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  
  


// FETCHING A PARTICULAR USER USING EMAIL

async function getUser(req,res,next){
    try {
        const user = await Users.findOne({email: req.params.email});
        if(user==null){
            return res.status(404).json({message: "Can not find USER"});
        }

    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    res.user = user;
    next();
}





// DELETE USER FUNCTION
router.delete("/:email", async(req,res)=> {
    try {
        const user = await Users.findOne({email: req.params.email});
        
        // CHECKING USER EXISTS OR NOT
        if(user){
            await Users.deleteOne({email: req.params.email})
            res.status(200).json({message: "User deleted successfully"});
        } else {
            res.status(404).json({message: "User not found"});
        }
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



// UPDATE USER INFO

router.patch("/:email", async(req,res)=>{
    try {

        // finding by id
        const user = await Users.findOne({email: req.params.email});

        // updating
        user.username = req.body.username;
        user.password = req.body.password;

        // storing / saving this updated data
        const updatedUser = await user.save();

        res.status(201).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})















module.exports = router;