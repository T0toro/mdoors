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
      async = require('async'),
      Ozp = mongoose.model('Ozp'),
      OzpShifts = mongoose.model('OzpShifts'),
      User = mongoose.model('User'),
      Departament = mongoose.model('Departament');

/*
 * Expos
 */


/**
 * Ozp list
 */

exports.index = (req, res, next) => {
  const year = new Date().getFullYear(),
        month = new Date().getMonth() + 1,
        start = new Date(year, month - 1, 1),
        end = new Date(year, month, 1);

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
        Ozp
          .find()
          .sort({
            date: -1
          })
          .exec((err, ozps) => {
            return cb(err, ozps);
          });
      },
      function(cb) {
        OzpShifts
          .find({
            date: {
              $gte: start,
              $lt: end
            }
          })
          .exec(function(err, ozpShifts) {
            return cb(err, ozpShifts);
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

      return res.render('dashboard/ozp/indexAdmin', {
        users: users,
        departaments: departaments,
        ozps: result[2],
        ozpShifts: result[3]
      });
    });
  } else {
    async.parallel([
      function(cb) {
        Ozp
        .findById(req.user.id)
        .sort({
          date: -1
        })
        .exec((err, ozps) => {
          return cb(err, ozps);
        });
      }, 
      function(cb) {
        OzpShifts
          .find({
            date: {
              departament: req.user.departament,
              $gte: start,
              $lt: end
            }
          })
          .exec(function(err, ozpShifts) {
            return cb(err, ozpShifts);
          });
      }
    ], (err, result) => {
      if (err) { return next(err); }

      return res.render('dashboard/ozp/index', {
        ozps: result[0],
        ozpShifts: result[1]
      });
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
        Ozp
          .find({
            departament: req.body.departament,
            date: {
              $gte: start,
              $lt: end
            }
          })
          .exec((err, ozps) => {
            return cb(err, ozps);
          });
      },
      function(cb) {
        OzpShifts
          .find({
            departament: req.body.departament,
            date: {
              $gte: start,
              $lt: end
            }
          })
          .exec(function(err, ozpShifts) {
            return cb(err, ozpShifts);
          });
      }
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

      return res.render('dashboard/ozp/indexAdmin', {
        users: users,
        departaments: departaments,
        ozps: result[2],
        ozpShifts: result[3]
      });
    });
  } else {
    return res.redirect('dashboard/ozp');
  }
};

exports.store = (req, res, next) => {
  const date = req.body.date.split('.');

  Ozp.create({
    user: req.user.id,
    departament: req.user.departament,
    date: new Date(date[2], date[1] - 1, date[0]),
    amount: req.body.amount,
    payment: req.body.payment,
    address: req.body.address
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/ozp');
  });
};


exports.setShift = (req, res, next) => {
  const date = req.body.date.split('.');

  OzpShifts
    .create({
      date: new Date(date[2], date[1] - 1, date[0]),
      user: req.user.id,
      departament: req.user.departament,
      amount: req.body.amount,
      count: req.body.count
    }, (err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/odds');
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
