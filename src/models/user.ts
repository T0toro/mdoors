'use strict';

/**
 * User model
 *
 * @module       :: model
 * @description  :: Represent user in database
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      bcrypt   = require('bcryptjs'),
      Schema   = mongoose.Schema;

// userPlugin = require('mongoose-user');

/**
 * User schema
 */

const UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  login: {
    type: String,
    default: ''
  },
  telephone: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  departament: {
    type: String,
    default: ''
  },
  group: {
    type: String,
    default: ''
  }
});

/**
 * User plugin
 */

// UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.methods.authenticate = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

/**
 * Statics
 */

UserSchema.statics = {};

/**
 * Register
 */

mongoose.model('User', UserSchema);
