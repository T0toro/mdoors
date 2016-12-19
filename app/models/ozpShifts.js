/**
 * OzpShifts
 *
 * @module       :: model
 * @description  :: Represent OzpShiftss in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * OzpShiftsSchema
 */

const OzpShiftsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },

  user: {
    type: String,
    default: ''
  },

  departament: {
    type: String,
    default: ''
  },

  count: {
    type: Number,
    default: 0
  },

  amount: {
    type: Number,
    default: 0
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

OzpShiftsSchema.plugin(timestamps);

/**
 * Methods
 */

OzpShiftsSchema.methods = {};

/**
 * Statics
 */

OzpShiftsSchema.statics = {};

/**
 * Register
 */

mongoose.model('OzpShifts', OzpShiftsSchema);
