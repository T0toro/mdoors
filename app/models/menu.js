/**
 * Menu
 *
 * @module       :: model
 * @description  :: Represent menu in database
 */

/*
 * Module variables
 */

let mongoose, Schema, MenuSchema;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
Schema = mongoose.Schema;

/*
 * MenuSchema
 */

MenuSchema = new Schema({
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
 * Methods
 */

MenuSchema.method({

});

/**
 * Statics
 */

MenuSchema.static({

});

/**
 * Register
 */

mongoose.model('Menu', MenuSchema);
