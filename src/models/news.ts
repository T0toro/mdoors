'use strict';

/**
 * News
 *
 * @module       :: model
 * @description  :: Represent news in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * NewsSchema
 */

const NewsSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  thumb: {
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

NewsSchema.plugin(timestamps);

/**
 * Methods
 */

NewsSchema.methods = {};

/**
 * Statics
 */

NewsSchema.statics = {};

/**
 * Register
 */

mongoose.model('News', NewsSchema);
