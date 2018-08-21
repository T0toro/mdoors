/**
 * Product
 *
 * @module       :: model
 * @description  :: Represent Products in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/**
 * Expo
 */

export default new Schema({
  name: String,
  slug: String,

  manufactureDate: {
    type: Date,
    default: Date.now,
  },

  count: {
    type: Number,
    default: 0,
  },
});
