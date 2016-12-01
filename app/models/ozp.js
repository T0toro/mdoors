/**
 * Ozp
 *
 * @module       :: model
 * @description  :: Represent Ozps in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * OzpSchema
 */

const OzpSchema = new Schema({
  user: {
    type: String,
    default: ''
  },

  departament: {
    type: String,
    default: ''
  },

  date: {
    type: Date,
    default: Date.now
  },

  amount: {
    type: Number,
    default: 0
  },

  payment: {
    type: Number,
    default: 0
  },

  address: {
    type: String,
    default: ''
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Plugins
 */

OzpSchema.plugin(timestamps);

/**
 * Methods
 */

OzpSchema.methods = {};

/**
 * Statics
 */

OzpSchema.statics = {};

/**
 * Register
 */

mongoose.model('Ozp', OzpSchema);
