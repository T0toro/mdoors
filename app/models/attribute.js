'use strict';

/**
 * Attribute
 *
 * @module       :: model
 * @description  :: Represent Attributes in database
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema = mongoose.Schema;

/*
 * AttributeSchema
 */

const AttributeSchema = new Schema({
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

AttributeSchema.plugin(timestamps);

/**
 * Methods
 */

AttributeSchema.methods = {};

/**
 * Statics
 */

AttributeSchema.statics = {};

/**
 * Register
 */

mongoose.model('Attribute', AttributeSchema);
