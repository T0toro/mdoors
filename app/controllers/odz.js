'use strict';

/**
 * Odz controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Odz ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      moment   = require('moment'),
      Odz = mongoose.model('Odz');

/*
 * Expos
 */


/**
 * Odz list
 */

exports.index = (req, res, next) => {
  Odz
    .find()
    .exec((err, odzs) => {
      if (err) { return next(err); }

      if (Array.isArray(odzs)) {
        return res.render('dashboard/odzs/index', { odzs: odzs });
      }

      return res.render('dashboard/odzs/index');
    });
};

exports.create = (req, res) => res.render('dashboard/odzs/create');

exports.store = (req, res, next) => {
  const userDate = req.body.manufactureDate.split('.');

  Odz.create({
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0])
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/odzs');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Odz
    .findById(id)
    .exec((err, Odz) => {
      if (err) { return next(err); }

      if (Odz) { return res.render('dashboard/odzs/edit', { odz: odz }); }

      return res.redirect('/dashboard/odzs');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '',
        userDate = req.body.manufactureDate.split('.');

  Odz.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0])
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/odzs');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Odz
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/odzs');
    });
};
