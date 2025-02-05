const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user= require('./models/user');
const mongoose = require('mongoose');


//check username(email) and password is valid or not
passport.use(new LocalStrategy(async (Email, password, done) => {
  try {
      // Find user by email
      const user = await user.findOne({ email: Email });

      if (!user) {
          return done(null, false, { message: 'Incorrect Username.' });
      }

      // Compare password
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
          return done(null, user);
      } else {
          return done(null, false, { message: 'Incorrect password' });
      }
  } catch (err) {
      return done(err);
  }
}));

        


module.exports = passport; //export passport