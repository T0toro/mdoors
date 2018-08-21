/**
 * OddsBalance
 *
 * @module       :: model
 * @description  :: Represent OddsBalances in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/*
 * OddsBalance Schema
 */

export default new Schema({
  user: {
    type: String,
    default: '',
  },

  departament: {
    type: String,
    default: '',
  },

  balance: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
