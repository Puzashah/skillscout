const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define the schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});
//to hash password
// Hash password before saving
userSchema.pre('save', async function (next) {
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
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
      throw err;
  }
};

// Create and export the User model
const user = mongoose.model("user",userSchema);
module.exports = user;
