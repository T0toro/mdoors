'use strict';

/**
 * USer controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle user( login, logout and etc )
 */

/*!
 * Module variables
 */

let mongoose, User;

/*!
 * Module dependencies
 */

mongoose = require('mongoose');
User = mongoose.model('User');

/*!
 * Expos
 */


/**
 * Login
 */

exports.login = (req, res, next) => {
  res.render('user/login');
};

exports.logout = (req, res, next) => {
  User.create({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status,
  }, (err, user) => {
    if (err) { return next(err); }

    if (user) { return res.redirect('/'); }
  });
};
