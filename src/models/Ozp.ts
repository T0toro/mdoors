/**
 * Ozp
 *
 * @module       :: model
 * @description  :: Represent Ozps in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/*
 * OzpSchema
 */

export default new Schema({
  user: String,
  departament: String,
  address: String,

  date: {
    type: Date,
    default: Date.now,
  },

  amount: {
    type: Number,
    default: 0,
  },

  payment: {
    type: Number,
    default: 0,
  },
});
