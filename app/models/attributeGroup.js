/**
 * AttributeGroup
 *
 * @module       :: model
 * @description  :: Represent AttributeGroups in database
 *
 *
 * Module dependencies
 */

const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp'),
      Schema     = mongoose.Schema;

/*!
 * AttributeGroupSchema
 */

const AttributeGroupSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  slug: {
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
