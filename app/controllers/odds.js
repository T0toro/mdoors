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
      moment   = require('moment'),
      Odds = mongoose.model('Odds');

/*
 * Expos
 */


/**
 * odds list
 */

exports.index = (req, res, next) => {
  Odds
    .find()
    .exec((err, odds) => {
      if (err) { return next(err); }

      if (Array.isArray(odds)) {
        return res.render('dashboard/odds/index', { odds: odds });
      }

      return res.render('dashboard/odds/index');
    });
};

exports.create = (req, res) => res.render('dashboard/odds/create');

exports.store = (req, res, next) => {
  const userDate = req.body.manufactureDate.split('.');

  Odds.create({
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0])
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/odds');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Odds
    .findById(id)
    .exec((err, odds) => {
      if (err) { return next(err); }

      if (odds) { return res.render('dashboard/odds/edit', { odds: odds }); }

      return res.redirect('/dashboard/odds');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '',
        userDate = req.body.manufactureDate.split('.');

  Odds.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0])
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
