/**
 * OddsBalance
 *
 * @module       :: model
 * @description  :: Represent OddsBalances in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * OddsBalanceSchema
 */

const OddsBalanceSchema = new Schema({
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

  balance: {
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

OddsBalanceSchema.plugin(timestamps);

/**
 * Methods
 */

OddsBalanceSchema.methods = {};

/**
 * Statics
 */

OddsBalanceSchema.statics = {};

/**
 * Register
 */

mongoose.model('OddsBalance', OddsBalanceSchema);
