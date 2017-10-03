/**
 * Odds controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle odds ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');

const Odds = mongoose.model('Odds');
const OddsBalance = mongoose.model('OddsBalance');
const User = mongoose.model('User');
const Departament = mongoose.model('Departament');

const getAccountantData = async (start = 0, end = 0, query) => {
  const basicQuery = { date: { $gte: start, $lt: end } };
  const oddsQuery = Object.assign(basicQuery, query);

  const [users, departaments, oddss, oddsBalance] = await Promise.all([
    User.find(),
    Departament.find(),
    Odds.find(oddsQuery).sort({ date: 1 }),
    OddsBalance.find(oddsQuery),
  ]);

  const usersHash = {};
  const departamentsHash = {};

  if (Array.isArray(users) && !!users.length) {
    users.forEach((user) => {
      usersHash[user.id] = user.name;
    });
  }

  if (Array.isArray(departaments) && !!departaments.length) {
    departaments.forEach((departament) => {
      departamentsHash[departament.id] = departament.name;
    });
  }

  return {
    oddss,
    oddsBalance,
    users: usersHash,
    departaments: departamentsHash,
  };
};

const getSellerData = async (req, start, end) => {
  const departament = req.user.departament || '';
  const basicQuery = { date: { $gte: start, $lt: end } };
  const oddsQuery = Object.assign(basicQuery, {
    user: req.user.id,
  });


  const [oddsBalance, oddss] = await Promise.all([
    OddsBalance.find({
      departament,
      date: { $gte: start, $lt: end },
    }),
    Odds.find(oddsQuery).sort({ date: 1 }),
  ]);

  return {
    oddsBalance,
    oddss,
  };
};

/*
 * Expos
 */

exports.index = async (req, res) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month - 1, 31);

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

exports.filter = async (req, res) => {
  const month = Number(req.body.month);
  const year = Number(req.body.year);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month - 1, 31);
  const query = {};

  if (!!req.body.departament && !!req.body.departament.length) { query.departament = req.body.departament; }
  if (!!req.body.user && !!req.body.user.length) { query.user = req.body.user; }

  if (req.user.group === 'accountant') {
    const odds = await getAccountantData(start, end, query);

    return res.render('dashboard/odds/indexAdmin', odds);
  }

  const odds = await getSellerData(req, start, end);

  return res.render('dashboard/odds/index', odds);
};

exports.store = async (req, res) => {
  const date = req.body.date.split('.');

  await Odds.create({
    user: req.user.id,
    departament: req.user.departament,
    date: new Date(date[2], date[1] - 1, date[0]),
    receivedAmount: req.body.receivedAmount,
    receivedComment: req.body.receivedComment,
    retiredAmount: req.body.retiredAmount,
    retiredComment: req.body.retiredComment,
  });

  return res.redirect('/dashboard/odds');
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  const odds = await Odds.findById(id);

  return res.render('dashboard/odds/edit', { odds });
};

exports.update = async (req, res) => {
  const date = req.body.date.split('.');
  const id = req.body.id;

  await Odds.update({
    _id: id,
  }, {
    user: req.user.id,
    departament: req.user.departament,
    date: new Date(date[2], date[1] - 1, date[0]),
    receivedAmount: req.body.receivedAmount,
    receivedComment: req.body.receivedComment,
    retiredAmount: req.body.retiredAmount,
    retiredComment: req.body.retiredComment,
  });

  return res.redirect('/dashboard/odds');
};

exports.setBalance = async (req, res) => {
  const date = req.body.date.split('.');

  await OddsBalance.create({
    date: new Date(date[2], date[1] - 1, date[0]),
    user: req.user.id,
    departament: req.user.departament,
    balance: req.body.balance,
  });

  return res.redirect('/dashboard/odds');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await Odds.findByIdAndRemove(id);

  return res.redirect('/dashboard/odds');
};
