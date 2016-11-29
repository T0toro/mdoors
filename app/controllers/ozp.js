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
      moment   = require('moment'),
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

exports.create = (req, res) => res.render('dashboard/ozp/create');

exports.store = (req, res, next) => {
  const userDate = req.body.manufactureDate.split('.');

  Ozp.create({
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0])
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/ozp');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Ozp
    .findById(id)
    .exec((err, ozp) => {
      if (err) { return next(err); }

      if (ozp) { return res.render('dashboard/ozp/edit', { ozp: ozp }); }

      return res.redirect('/dashboard/ozp');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '',
        userDate = req.body.manufactureDate.split('.');

  Ozp.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0])
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/ozps');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Ozp
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/ozps');
    });
};
