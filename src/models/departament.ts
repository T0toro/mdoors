'use strict';

/**
 * Departament
 *
 * @module       :: model
 * @description  :: Represent Departaments in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*
 * DepartamentSchema
 */

const DepartamentSchema = new Schema({
  name: {
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

DepartamentSchema.plugin(timestamps);

/**
 * Methods
 */

DepartamentSchema.methods = {};

/**
 * Statics
 */

DepartamentSchema.statics = {};

/**
 * Register
 */

mongoose.model('Departament', DepartamentSchema);
