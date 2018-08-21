/**
 * Odds
 *
 * @module       :: model
 * @description  :: Represent Oddss in database
 *
 * Module dependencies
 */

import { Schema } from 'mongoose';

/*
 * Odds Schema
 */

export default new Schema({
  user: String,
  departament: String,

  receivedAmount: {
    type: Number,
    default: 0,
  },

  receivedComment: {
    type: String,
    default: '',
  },

  retiredAmount: {
    type: Number,
    default: 0,
  },

  retiredComment: {
    type: String,
    default: '',
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
