/**
 * Dependencies
 */

import { Schema } from 'mongoose';
import UserSchema from '../models/User';

/**
 * Register model
 */

const User = mongoose.model('User', UserSchema);

local = require('./passport/local');

/**
 * Expose
 */

module.exports = (passport, config) => {
  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, (err, user) => {
      done(err, user);
    });
  });

  // use these strategies
  passport.use(local);
};
