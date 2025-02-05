const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const worker= require('./models/worker');
const user= require('./models/user');
const passport = require('./auth');


//TO Initialize the passport
app.use(passport.initialize());
const localAuthMiddleware  = passport.authenticate('local',{session: false})
//fetch data
app.get('/',localAuthMiddleware ,function(req,res){
    res.send('welcome to our services...')
})
 
 //get methord (API TO GET FETCH USER INFORMATION OF USER)
 app.get('/usersignup', async(req, res)=>{
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
//post(api to resister user)
 app.post('/usersignup', async(req,res)=>{
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
  //get methord (API TO GET FETCH USER INFORMATION OF WORKER)
  app.get('/workersignup', async(req, res)=>{
    try{
      const data = await worker.find();
      console.log('data fetched');
      res.status(200).json(data);
    } 
      catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serve Error'});
  
    }
   })
   //post(api to register as worker)
   app.post('/workersignup', async(req,res)=>{
    try{
      const data = req.body//assuming the req body contains the person data
  
      //create new person document using the mongoose model
      const newworker = new worker(data);
  
      //save the new person to the database
      const response = await newworker.save();
      console.log('data saved');
      res.status(200).json(response); 
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Serve Error'});
    }
   })
//to define work type of worker(API TO FETCH THE DATA OF PRTICULAR WORKER)
 app.get('/workersignup/:workType', async(req, res)=>{
  try{
    const workType = req.params.workType;//to extract the work type from the uml parameter
    if(workType =='Plumber'|| workType == 'Electrician'|| workType=='Engineer'){
      const response = await worker.find({profession: workType});
      console.log('response fetched');
      res.status(200).json(response); 
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }
  }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Serve Error'});  
    }
   })

   //import the router file(USER)
   const userRoutes = require('./routes/userRoutes');
   app.use('/user',userRoutes);

   //import the router file(WORKER)
   const workerRoutes = require('./routes/workerRoutes');
   app.use('/worker',workerRoutes);

  

app.listen(3005, () =>{
    console.log('listening on port 3005');
})
