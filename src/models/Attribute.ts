/**
 * Attribute
 *
 * @module       :: model
 * @description  :: Represent Attributes in database
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/*
 * Attribute Schema
 */

export default new Schema({
  name: String,
  group: {
    type: Array,
    default: [],
  },
  product: {
    type: Array,
    default: [],
  },
});
