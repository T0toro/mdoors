/**
 * Ozp controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Ozp ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const path = require('path');
const Etpl = require('email-templates').EmailTemplate;
const email = require('nodemailer');
const moment = require('moment');

const Ozp = mongoose.model('Ozp');
const OzpShifts = mongoose.model('OzpShifts');
const User = mongoose.model('User');
const Departament = mongoose.model('Departament');


const getAcountantData = async (start = 0, end = 0, query) => {
  const basicQuery = { date: { $gte: start, $lt: end } };
  const ozpsQuery = Object.assign(basicQuery, query);

  const [users, departaments, ozps, ozpShifts] = await Promise.all([
    User.find(),
    Departament.find(),
    Ozp.find(ozpsQuery).sort({ date: 1 }),
    OzpShifts.findOne(ozpsQuery),
  ]);

  const usersHash = {};
  const departamentsHash = {};

  users.forEach((user) => {
    usersHash[user.id] = user.name;
  });

  departaments.forEach((departament) => {
    departamentsHash[departament.id] = departament.name;
  });

  return {
    ozps,
    ozpShifts,
    users: usersHash,
    departaments: departamentsHash,
    code: 200,
  };
};

const getSellerData = async (req, start = 0, end = 0) => {
  const [ozps, ozpShifts] = await Promise.all([
    Ozp.find({
      user: req.user.id,
      date: { $gte: start, $lt: end },
    }),
    OzpShifts.findOne({
      user: req.user.id,
      date: { $gte: start, $lt: end },
    }),
  ]);

  return {
    ozpShifts,
    ozps,
    code: 200,
  };
};

/*
 * Expos
 */

exports.index = async (req, res) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  if (req.user.group === 'accountant') {
    const ozps = await getAcountantData(start, end);

    return res.render('dashboard/ozp/indexAdmin', ozps);
  }


  return res.render('dashboard/ozp/index');
};

exports.indexAdmin = (req, res) => {
  if (req.user.group !== 'accountant') {
    res.json({
      code: 403,
      msg: 'У вас нет доступа к данному разделу',
    });
  }
};

exports.indexUser = async (req, res) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month - 1, 31);

  const [ozps, ozpShifts] = await Promise.all([
    Ozp.find({
      user: req.user.id,
      date: { $gte: start, $lt: end },
    }).sort({
      date: -1,
    }),
    OzpShifts.find({
      departament: req.user.departament,
      date: { $gte: start, $lt: end },
    }),
  ]);

  return res.json({
    ozpShifts,
    ozps,
    code: 200,
  });
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
    const ozps = await getAcountantData(start, end, query);

    return res.render('dashboard/ozp/indexAdmin', ozps);
  }

  const ozps = await getSellerData(req, start, end);

  return res.json(ozps);
};

exports.sendOrder = async (req, res) => {
  const departament = await Departament.findById(req.user.departament);

  const transporter = email.createTransport({
    service: 'Yandex',
    auth: {
      user: 'orders@makdoors.ru',
      pass: 'qrj7tw43bt',
    },
  });

  const reportTpl = path.join(`${__dirname}/../views`, 'emails', 'report');

  const reportObj = {
    moment,
    // Seller info
    name: req.user.name,
    lastname: req.user.lastname,
    departament: departament.name,
    telephone: req.user.telephone,

    // Report info
    ozps: req.body.data.ozps,
    ozpShifts: req.body.data.ozpShifts,
    summ: req.body.data.ozpsSumm,
  };

  const reportLetter = new Etpl(reportTpl);
  const mailOptions = {
    from: 'orders@makdoors.ru',
    to: 'dveri74-buh@mail.ru',
    subject: `${req.user.name} ${req.user.lastname} Отчет ОЗП - makdoors.ru`,
    html: '',
  };

  const reportLetterTemplate = await reportLetter.render(reportObj);

  mailOptions.html = reportLetterTemplate.html;

  transporter.sendMail(mailOptions).then((error, info) => {
    let msg = '';
    let ss = {};
    let code = 200;

    if (error) {
      code = 504;
      msg = 'Ошибка при отправке отчета';
      ss = error;
    } else {
      code = 200;
      msg = 'Отчет успешно отправлен';
      ss = info;
    }

    return res.json({
      msg,
      code,
      info: ss,
    });
  });
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  const ozp = await Ozp.findById(id);

  return res.render('dashboard/ozp/edit', { ozp });
};

exports.store = (req, res, next) => {
  const date = req.body.date.split('.');

  Ozp.create({
    user: req.user.id,
    departament: req.user.departament,
    date: new Date(date[2], date[1] - 1, date[0]),
    amount: req.body.amount,
    payment: req.body.payment,
    address: req.body.address,
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/ozp');
  });
};

exports.update = async (req, res) => {
  const date = req.body.date.split('.');
  const id = req.body.id;

  await Ozp.update({
    _id: id,
  }, {
    user: req.user.id,
    departament: req.user.departament,
    date: new Date(date[2], date[1] - 1, date[0]),
    amount: req.body.amount,
    payment: req.body.payment,
    address: req.body.address,
  });

  return res.redirect('/dashboard/ozp');
};

exports.setShift = async (req, res) => {
  const date = req.body.date.split('.');

  await OzpShifts.create({
    date: new Date(date[2], date[1] - 1, date[0]),
    user: req.user.id,
    departament: req.user.departament,
    amount: req.body.amount,
    count: req.body.count,
  });

  return res.redirect('/dashboard/ozp');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await Ozp.findByIdAndRemove(id);

  return res.redirect('/dashboard/ozp');
};
