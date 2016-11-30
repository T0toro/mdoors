/**
 * Odds
 *
 * @module       :: model
 * @description  :: Represent Oddss in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * OddsSchema
 */

const OddsSchema = new Schema({
  // Seller info
  date: {
    type: Date,
    default: Date.now
  },

  receivedAmount: {
    type: Number,
    default: 0
  },

  receivedComment: {
    type: String,
    default: ''
  },

  retiredAmount: {
    type: Number,
    default: 0
  },

  retiredComment: {
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

OddsSchema.plugin(timestamps);

/**
 * Methods
 */

OddsSchema.methods = {};

/**
 * Statics
 */

OddsSchema.statics = {};

/**
 * Register
 */

mongoose.model('Odds', OddsSchema);
