const express = require('express');
const router = express.Router();
const user = require('./../models/user');


router.post("/signup", async (req, res) => {
    try{
    const data = req.body//assuming the req body contains the user data
             
        //create new user document using the mongoose model
        const newuser = new user(data);
        //save the new user to the database
        const response = await newuser.save();
        console.log('data saved');
        res.status(200).json(response); 
        }
        catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serve Error'});
        }
       }) 

       
 //get methord (API TO GET FETCH USER INFORMATION)
 router.get('/signup', async(req, res)=>{
    try{
      const data = await user.find();
      console.log('data fetched');
      res.status(200).json(data);
    } 
      catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serve Error'});
  
    }
   })
   // Login Route
router.post("/login", (req, res) => {
  res.json({ message: "Login successful!", user: req.user });
});
// Login Route
router.post('/login', async(req, res) => {
  try{
      // Extract aadharCardNumber and password from request body
      const {email, password} = req.body;

      // Check if aadharCardNumber or password is missing
      if (!email || !password) {
          return res.status(400).json({ error: 'email and password are required' });
      }

      // Find the user by aadharCardNumber
      const user = await user.findOne({email: email});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'email Card Number or Password'});
      }
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

   module.exports = router;

