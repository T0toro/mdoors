'use strict';

/**
 * Ozp controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Ozp ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      Ozp = mongoose.model('Ozp');

/*
 * Expos
 */


/**
 * Ozp list
 */

exports.index = (req, res, next) => {
  Ozp
    .find()
    .exec((err, ozps) => {
      if (err) { return next(err); }

      if (Array.isArray(ozps)) {
        return res.render('dashboard/ozp/index', { ozps: ozps });
      }

      return res.render('dashboard/ozp/index');
    });
};

exports.store = (req, res, next) => {
  const date = req.body.date.split('.');

  Ozp.create({
    user: req.user.id,
    date: new Date(date[2], date[1] - 1, date[0]),
    amount: req.body.amount,
    payment: req.body.payment,
    address: req.body.address
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/ozp');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Ozp
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/ozp');
    });
};
