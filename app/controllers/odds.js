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

const mongoose    = require('mongoose'),
      async       = require('async'),
      Odds        = mongoose.model('Odds'),
      User        = mongoose.model('User'),
      Departament = mongoose.model('Departament');

/*
 * Expos
 */


/**
 * odds list
 */

exports.index = (req, res, next) => {
  if (req.user.group === 'accountant') {
    async.parallel([
      function(cb) {
        User
          .find()
          .exec(function(err, users) {
            return cb(err, users);
          });
      },
      function(cb) {
        Departament
          .find()
          .exec(function(err, departaments) {
            return cb(err, departaments);
          });
      },
      function(cb) {
        Odds
          .find()
          .sort({
            date: -1
          })
          .exec(function(err, oddss) {
            return cb(err, oddss);
          });
      },
    ], function(err, result) {
      if (err) { return next(err); }

      let users = {},
          departaments = {};

      if(Array.isArray(result[0]) && !!result[0].length) {
        result[0].forEach(function(user) {
          users[user.id] = user.name;
        });
      }

      if(Array.isArray(result[1]) && !!result[1].length) {
        result[1].forEach(function(departament) {
          departaments[departament.id] = departament.name;
        });
      }

      return res.render('dashboard/odds/indexAdmin', {
        users: users,
        departaments: departaments,
        oddss: result[2]
      });
    });
  } else {
    Odds
      .find({
        user: req.user.id
      })
      .sort({
        date: -1
      })
      .exec(function(err, oddss) {
        if (err) { return next(err); }

        if (Array.isArray(oddss)) {
          return res.render('dashboard/odds/index', { oddss: oddss });
        }

        return res.render('dashboard/odds/index');
      });
  }
};

exports.filter = (req, res, next) => {
  const month = Number(req.body.mounth),
        year  = Number(req.body.year),
        start = new Date(year, month - 1, 1),
        end = new Date(year, month, 1);

  if (req.user.group === 'accountant') {
    async.parallel([
      function(cb) {
        User
          .find()
          .exec((err, users) => {
            return cb(err, users);
          });
      },
      function(cb) {
        Departament
          .find()
          .exec((err, departaments) => {
            return cb(err, departaments);
          });
      },
      function(cb) {
        Odds
          .find({
            departament: req.body.departament,
            date: {
              $gte: start,
              $lt: end
            }
          })
          .exec((err, oddss) => {
            return cb(err, oddss);
          });
      }
    ], function(err, result) {
      if (err) { return next(err); }

      let users = {},
          departaments = {};

      if (Array.isArray(result[0]) && !!result[0].length) {
        result[0].forEach(function(user) {
          users[user.id] = user.name;
        });
      }

      if (Array.isArray(result[1]) && !!result[1].length) {
        result[1].forEach(function(departament) {
          departaments[departament.id] = departament.name;
        });
      }

      return res.render('dashboard/odds/indexAdmin', {
        users: users,
        departaments: departaments,
        oddss: result[2]
      });
    });
  } else {
    Odds
      .find({
        user: req.user.id,
        date: {
          $gte: start,
          $lt: end
        }
      })
      .exec((err, oddss) => {
        if (err) { return next(err); }

        return res.render('dashboard/odds/index', {
          oddss: oddss
        });
      });
  }
};


exports.store = (req, res, next) => {
  const date = req.body.date.split('.');

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
