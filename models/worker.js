const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


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
// Hash password before saving
workerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
  } catch (err) {
      return next(err);
  }
});

// Compare password method
workerSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
      throw err;
  }
};

// Create and export the User model
// Create and export the User model
const worker = mongoose.model("worker",workerSchema);
module.exports = worker;