const express = require('express');
const router = express.Router();
const user = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


  //post(api to register as user)
  router.post('/usersignup', async(req,res)=>{
    try{
      const data = req.body//assuming the req body contains the person data
  
      //create new person document using the mongoose model
      const newuser = new user(data);
  
      //save the new person to the database
      const response = await newuser.save();
      console.log('data saved');
      
      const payload ={
        id: response.id
      }
      console.log(JSON.stringify(payload));
      const tocken = generateToken(payload);
      console.log("Tocken is :",tocken);
      res.status(200).json({response: response, tocken: tocken}); 
    }
    
    
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Serve Error'});
    }
   })

       
 //get methord (API TO GET FETCH USER INFORMATION)
 router.get('/usersignup', async(req, res)=>{
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
      // Extract email and password from request body
      const {email, password} = req.body;

      // Check if email or password is missing
      if (!email || !password) {
          return res.status(400).json({ error: 'email and password are required' });
      }

      // Find the user by email
      const user = await user.findOne({email: email});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'email Card Number or Password'});
      }
     // generate Token 
     const payload = {
     id: user.id,
   }
   const token = generateToken(payload);
      
   // resturn token as response
    res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      const userId = userData.id;
      const user = await user.findById(userId);
      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
      const userId = req.user.id; // Extract the id from the token
      const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

      // Check if currentPassword and newPassword are present in the request body
      if (!currentPassword || !newPassword) {
          return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
      }

      // Find the user by userID
      const user = await user.findById(userId);

      // If user does not exist or password does not match, return error
      if (!user || !(await user.comparePassword(currentPassword))) {
          return res.status(401).json({ error: 'Invalid current password' });
      }

      // Update the user's password
      user.password = newPassword;
      await user.save();

      console.log('password updated');
      res.status(200).json({ message: 'Password updated' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

   module.exports = router;

