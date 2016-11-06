'use strict';

/**
 * Departament controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle departament( login, logout and etc )
 *
 *
 * Module dependencies
 */

const mongoose    = require('mongoose'),
      bcrypt      = require('bcryptjs'),
      Departament = mongoose.model('Departament');

/*!
 * Expos
 */

exports.index = (req, res, next) => {
  Departament
    .find()
    .exec((err, departaments) => {
      if (err) { return next(departaments); }

      return res.render('dashboard/departaments/index', {
        departaments: departaments
      });
    });
};

exports.create  = (req, res, next) => res.render('dashboard/departaments/create');

exports.store   = (req, res, next) => {
  Departament.create({
    name: req.body.name,
    address: req.body.address,
    telephone: req.body.telephone
  }, (err, departament) => {
    if (err) { return next(err) }

    return res.redirect('/dashboard/departaments');
  });
};

exports.edit    = (req, res, next) => {
  const id = req.params.id || '';

  Departament
    .findById(id)
    .exec((err, departament) => {
      if (err) { return next(err); }

      return res.render('dashboard/departaments/edit', {
        departament: departament
      });
    });
};

exports.update  = (req, res, next) => {
  const id = req.body.id || '';

  Departament.update({
    _id: id
  }, {
    name: req.body.name,
    address: req.body.address,
    telephone: req.body.telephone
  }, (err, departament) => {
    if (err) { return next(err) }

    return res.redirect('/dashboard/departaments');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Departament
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/departaments');
    });
};