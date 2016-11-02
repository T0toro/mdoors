'use strict';

/**
 * Product
 *
 * @module       :: model
 * @description  :: Represent Products in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * ProductSchema
 */

const ProductSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  manufactureDate: {
    type: Date,
    default: Date.now
  },
  count: {
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

ProductSchema.plugin(timestamps);

/**
 * Methods
 */

ProductSchema.methods = {};

/**
 * Statics
 */

ProductSchema.statics = {};

/**
 * Register
 */

mongoose.model('Product', ProductSchema);
