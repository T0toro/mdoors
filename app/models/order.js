/**
 * Order
 *
 * @module       :: model
 * @description  :: Represent Orders in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * OrderSchema
 */

const OrderSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
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

OrderSchema.plugin(timestamps);

/**
 * Methods
 */

OrderSchema.methods = {};

/**
 * Statics
 */

OrderSchema.statics = {};

/**
 * Register
 */

mongoose.model('Order', OrderSchema);
