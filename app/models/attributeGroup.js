/**
 * AttributeGroup
 *
 * @module       :: model
 * @description  :: Represent AttributeGroups in database
 */

/*
 * Module variables
 */

let mongoose, timestamps, Schema, AttributeGroupSchema;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
timestamps = require('mongoose-timestamp');
Schema = mongoose.Schema;

/*
 * AttributeGroupSchema
 */

AttributeGroupSchema = new Schema({
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

AttributeGroupSchema.plugin(timestamps);

/**
 * Methods
 */

AttributeGroupSchema.methods = {};

/**
 * Statics
 */

AttributeGroupSchema.statics = {};

/**
 * Register
 */

mongoose.model('AttributeGroup', AttributeGroupSchema);
