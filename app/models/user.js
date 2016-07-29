'use strict';

/**
 * User model
 *
 * @module       :: model
 * @description  :: Represent user in database
 */

/*!
 * Module variables
 */

let mongoose, userPlugin, UserSchema, Schema, bcrypt;

/*!
 * Module dependencies
 */

mongoose = require('mongoose');
bcrypt   = require('bcrypt-nodejs');

// userPlugin = require('mongoose-user');
Schema = mongoose.Schema;


/**
 * User schema
 */

UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
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
    console.info('test pass', this, user, password);
    return true;
}

/**
 * Statics
 */

UserSchema.static({

});

/**
 * Register
 */

mongoose.model('User', UserSchema);
