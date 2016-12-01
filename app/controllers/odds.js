'use strict';

/**
 * Odds controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle odds ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      Odds = mongoose.model('Odds');

/*
 * Expos
 */


/**
 * odds list
 */

exports.index = (req, res, next) => {
  Odds
    .findById(req.user.id)
    .exec((err, odds) => {
      if (err) { return next(err); }

      if (Array.isArray(odds)) {
        return res.render('dashboard/odds/index', { odds: odds });
      }

      return res.render('dashboard/odds/index');
    });
};

exports.store = (req, res, next) => {
  const date = req.body.date.split('.');

  console.info(req.body);

  Odds.create({
    user: req.user.id,
    departament: req.user.departament,
    date: new Date(date[2], date[1] - 1, date[0]),
    receivedAmount: req.body.receivedAmount,
    receivedComment: req.body.receivedComment,
    retiredAmount: req.body.retiredAmount,
    retiredComment: req.body.retiredComment
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/odds');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Odds
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/odds');
    });
};
