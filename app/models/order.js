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
  // Seller info
  departament: {
    type: String,
    default: ''
  },

  user: {
    type: String,
    default: ''
  },

  product: {
    type: String,
    default: ''
  },

  discount: {
    type: String,
    default: ''
  },

  deliveryPrice: {
    type: String,
    default: ''
  },

  comment: {
    type: String,
    default: ''
  },

  // Bayer info
  fio: {
    type: String,
    default: ''
  },

  address: {
    type: String,
    default: ''
  },

  telephone: {
    type: String,
    default: ''
  },

  manufactureDate: {
    type: String,
    default: ''
  },

  deliveryDate: {
    type: String,
    default: ''
  },

  doors: {
    type: Array,
    default: []
  },

  pagonazsh: {
    type: Array,
    default: []
  },

  furnityra: {
    type: Array,
    default: []
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
