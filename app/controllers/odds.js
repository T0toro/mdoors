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
      moment      = require('moment'),
      Odds        = mongoose.model('Odds'),
      OddsBalance = mongoose.model('OddsBalance'),
      User        = mongoose.model('User'),
      Departament = mongoose.model('Departament');


async function getAccountantData(start = 0, end = 0) {
  const usersList       = await User.find(),
        departamentList = await Departament.find(),
        oddsList        = await Odds.find({ date: { $gte: start, $lt: end } }).sort({ date: -1 }),
        oddsBalance     = await OddsBalance.find({ date: { $gte: start, $lt: end } });

  let usersHash = {},
      departamentsHash = {};

  if(Array.isArray(usersList) && !!usersList.length) {
    usersList.forEach(function(user) {
      usersHash[user.id] = user.name;
    });
  }

  if(Array.isArray(departamentList) && !!departamentList.length) {
    departamentList.forEach(function(departament) {
      departamentsHash[departament.id] = departament.name;
    });
  }

  return {
    users: usersHash,
    departaments: departamentsHash,
    oddss: oddsList,
    oddsBalance: oddsBalance
  }
}

async function getSellerData(req, start, end) {
  const departament = req.user.departament || '',
        oddsBalance = await OddsBalance.find({
          departament: departament,
          date: { $gte: start, $lt: end }
        }),
        oddsList = await Odds.find({ user: req.user.id }).sort({ date: -1 });

  return {
    oddsBalance: oddsBalance,
    oddss: oddsList
  }
}

/*
 * Expos
 */

exports.index = (req, res, next) => {
  const year  = new Date().getFullYear(),
        month = new Date().getMonth() + 1,
        start = new Date(year, month - 1, 1),
        end   = new Date(year, month - 1, 31);

  if (req.user.group === 'accountant') {
    (async () => {
      const odds = await getAccountantData(start, end); 

      return res.render('dashboard/odds/indexAdmin', odds);
    })();
  } else {
    (async () => {
      const odds = await getSellerData(req, start, end);

      return res.render('dashboard/odds/index', odds);
    })();
  }
};

exports.filter = (req, res, next) => {
  const month = Number(req.body.month),
        year  = Number(req.body.year),
        start = new Date(year, month - 1, 1),
        end   = new Date(year, month - 1, 31);

  if (req.user.group === 'accountant') {
    (async () => {
      const odds = await getAccountantData(start, end); 

      return res.render('dashboard/odds/indexAdmin', odds);
    })();
  } else {
    (async () => {
      const odds = await getSellerData(req, start, end);

      return res.render('dashboard/odds/index', odds);
    })();
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

exports.edit = (req, res, next) => {
  const id = req.params.id;

  Odds
    .findById(id)
    .exec((err, odds) => {
      if(err) { return next(err); }

      return res.render('dashboard/odds/edit', {
        odds: odds
      });
    });
};

exports.update = (req, res, next) => {
  const date = req.body.date.split('.'),
        id   = req.body.id;

  Odds.update({
    _id: id
  }, {
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

exports.setBalance = (req, res, next) => {
  const date = req.body.date.split('.');

  OddsBalance.create({
    date: new Date(date[2], date[1] - 1, date[0]),
    user: req.user.id,
    departament: req.user.departament,
    balance: req.body.balance
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
