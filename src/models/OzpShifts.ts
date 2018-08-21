/**
 * OzpShifts
 *
 * @module       :: model
 * @description  :: Represent OzpShiftss in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/**
 * Expo
 */

export default new Schema({
  user: String,
  departament: String,
  date: {
    type: Date,
    default: Date.now,
  },

  count: {
    type: Number,
    default: 0,
  },

  amount: {
    type: Number,
    default: 0,
  },
});
