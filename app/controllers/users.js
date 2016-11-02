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

exports.create  = (req, res, next) => {};
exports.store   = (req, res, next) => {};
exports.edit    = (req, res, next) => {};
exports.update  = (req, res, next) => {};
exports.destroy = (req, res, next) => {};

exports.login = (req, res) => {
  res.render('user/login');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};
