const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const worker= require('./models/worker');
const user= require('./models/user');
require('dotenv').config();

const passport = require('./auth');
const {jwtAuthMiddleware, generateToken} = require('./jwt');


//TO Initialize the passport
app.use(passport.initialize());
const localAuthMiddleware  = passport.authenticate('local',{session: false})
//fetch data
app.get('/',localAuthMiddleware ,function(req,res){
    res.send('welcome to our services...')
})


 // Login Route
app.post('/login', async(req, res) => {
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

   //import the router file(USER)
   const userRoutes = require('./routes/userRoutes');
   app.use('/user',userRoutes);

   //import the router file(WORKER)
   const workerRoutes = require('./routes/workerRoutes');
   app.use('/worker',workerRoutes);

  

app.listen(3005, () =>{
    console.log('listening on port 3005');
})
