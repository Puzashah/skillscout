const express = require('express');
const router = express.Router();
const worker = require('./../models/worker');

   //post(api to register as worker)
   router.post('/workersignup', async(req,res)=>{
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

     //get methord (API TO GET FETCH USER INFORMATION OF WORKER)
  router.get('/workersignup', async(req, res)=>{
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
       
 
   //to define work type of worker(API TO FETCH THE DATA OF PRTICULAR WORKER)
 router.get('/:workType', async(req, res)=>{
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
   module.exports = router;

