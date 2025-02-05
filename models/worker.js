const mongoose = require("mongoose");

// Schema for user accounts
const workerSchema = new mongoose.Schema({
  firstName:
   { type: String, 
    required: true 
},
  lastName:
   { type: String, 
    required: true 
},
  email: 
  { type: String, 
    required: true, 
    unique: true 
},
  password: 
  { type: String, 
    required: true 
},
  address: 
  { type: String, 
    required: true 
},
  phoneNumber: 
  { type: String, 
    required: true 
},
  profession: 
  { type: String, 
    enum: ["Plumber","Electrician","Engineer"], 
    required: true //role type
} 
});

// Create and export the User model
// Create and export the User model
const worker = mongoose.model("worker",workerSchema);
module.exports = worker;