'use strict';

/**
 * User controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle user( login, logout and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      User     = mongoose.model('User');

/*!
 * Expos
 */

exports.index = (req, res, next) => {
  User
    .find()
    .exec((err, users) => {
      if (err) { return next(users); }

      return res.render('dashboard/users/index', {
        users: users
      });
    });
};

exports.create  = (req, res, next) => {
   const id = req.params.id || '';

  User
    .findById(id)
    .exec((err, user) => {
      if (err) { return next(err); }

      if (user) { return res.render('dashboard/users/edit', { user: user }); }

      return res.redirect('/dashboard/users');
    });
};

exports.store   = (req, res, next) => {
  const id = req.body.id || '';

  User.create({
    name: req.body.name,
    login: req.body.login,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    password: bcrypt.hashSync(req.body.password, 8),
  }, (err, user) => {
    if (err) { return next(err) }

    return res.redirect('/dashboard/users');
  });
};

exports.edit    = (req, res, next) => res.render('dashboard/users/edit');

exports.update  = (req, res, next) => {
  const id = req.body.id || '';

  User.update({
    _id: id
  }, {
    name: req.body.name,
    login: req.body.login,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    password: bcrypt.hashSync(req.body.password, 8),
  }, (err, user) => {
    if (err) { return next(err) }

    return res.redirect('/dashboard/users');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  User
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/users');
    });
};

exports.login = (req, res) => {
  res.render('user/login');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};
