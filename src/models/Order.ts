/**
 * Order
 *
 * @module       :: model
 * @description  :: Represent Orders in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/*
 * Order Schema
 */

export default new Schema({
  /**
   * Manager
   */

  user: String,
  departament: String,
  product: String,
  comment: String,

  discount: {
    type: Number,
    default: 0,
  },

  deliveryPrice: {
    type: Number,
    default: 0,
  },

  /**
   * Customer
   */

  fio: String,
  address: String,
  telephone: String,

  /**
   * Order
   */

  manufactureDate: String,
  deliveryDate: String,

  doors: {
    type: Array,
    default: [],
  },

  pagonazsh: {
    type: Array,
    default: [],
  },

  furnityra: {
    type: Array,
    default: [],
  },

  arki: {
    type: Array,
    default: [],
  },

  // Balance
  balance: {
    type: Number,
    default: 0,
  },

  prepay: {
    type: Number,
    default: 0,
  },

  status: {
    type: Number,
    default: 0,
  },
});
