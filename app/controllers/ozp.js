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

const mongoose    = require('mongoose'),
      async       = require('async'),
      path        = require('path'),
      Etpl        = require('email-templates').EmailTemplate,
      email       = require('nodemailer'),
      moment      = require('moment'),
      Ozp         = mongoose.model('Ozp'),
      OzpShifts   = mongoose.model('OzpShifts'),
      User        = mongoose.model('User'),
      Departament = mongoose.model('Departament');


async function getAcountantData(start, end, query) {
  const basicQuery = { date: { $gte: start, $lt: end } };
  const ozpsQuery = Object.assign(basicQuery, query);

  const usersList        = await User.find();
  const departamentsList = await Departament.find();
  const ozps             = await Ozp.find(ozpsQuery).sort({ date: -1 });
  const ozpShifts        = await OzpShifts.findOne({ date: { $gte: start, $lt: end } });

  let usersHash = {}, departamentsHash = {};

  if (Array.isArray(usersList) && !!usersList.length) {
    usersList.forEach(function(user) {
      usersHash[user.id] = user.name;
    });
  }

  if (Array.isArray(departamentsList) && !!departamentsList.length) {
    departamentsList.forEach(function(departament) {
      departamentsHash[departament.id] = departament.name;
    });
  }

  return {
    code: 200,
    users: usersHash,
    departaments: departamentsHash,
    ozps: ozps,
    ozpShifts: ozpShifts
  }
}

async function getSellerData(start = 0, end = 0) {
  const ozps = await Ozp.find({
    user: req.user.id,
    date: { $gte: start, $lt: end }
  });
  
  const ozpShifts = await OzpShifts.findOne({
    user: req.user.id,
    date: { $gte: start, $lt: end }
  });

  return {
    code: 200,
    ozps: ozps,
    ozpShifts: ozpShifts
  }
}

/*
 * Expos
 */

exports.index = (req, res, next) => {
 const year  = new Date().getFullYear(),
       month = new Date().getMonth() + 1,
       start = new Date(year, month - 1, 1),
       end   = new Date(year, month, 1);

  if (req.user.group === 'accountant') {
    (async () => {
      const ozps = await getAcountantData(start, end);

      return res.render('dashboard/ozp/indexAdmin', ozps);
    })();
  } else {
    return res.render('dashboard/ozp/index')
  }
};

exports.indexAdmin = (req, res, next) => {

  if (req.user.group !== 'accountant') res.json({
    code: 403,
    msg: 'У вас нет доступа к данному разделу'
  });

};

exports.indexUser = (req, res, next) => {
  const year = new Date().getFullYear(),
        month = new Date().getMonth() + 1,
        start = new Date(year, month - 1, 1),
        end   = new Date(year, month - 1, 31);

  (async () => {
    const ozps = await Ozp.find({
      user: req.user.id,
      date: { $gte: start, $lt: end }
    })
    .sort({
      date: -1
    });

    const ozpShifts = await OzpShifts.find({
      departament: req.user.departament,
      date: { $gte: start, $lt: end }
    })

    return res.json({
      code: 200,
      ozps: ozps,
      ozpShifts: ozpShifts
    });
  })();
};

exports.filter = (req, res, next) => {
  const month  = Number(req.body.month),
        year   = Number(req.body.year),
        start  = new Date(year, month - 1, 1),
        end    = new Date(year, month - 1, 31),
        query  = {};

  if (req.body.user && !!req.body.user.length) {
    query['user'] = req.body.user;
  }

  if (req.body.departament && !!req.body.departament.length) {
    query['departament'] = req.body.departament;
  }

  if (req.user.group === 'accountant') {
    (async () => {
      const ozp = await getAcountantData(start, end, query);

      return res.render('dashboard/ozp/indexAdmin', ozp);
    })();
  } else {
    (async () => {
      const ozp = await getSellerData(start, end);

      return res.json(ozp);
    })();
  }
};

exports.sendOrder = (req, res, next) => {
  Departament
    .findById(req.user.departament)
    .exec((err, departament) => {
      if(err) { return next(err); }

      let transporter = email.createTransport({
          service: 'Yandex',
          auth: {
              user: 'orders@makdoors.ru',
              pass: 'qrj7tw43bt'
          }
      }),
      reportEmail = 'report@makdoors.ru',
      reportTpl = path.join(`${__dirname}/../views`, 'emails', 'report'),
      reportObj = {
        // Seller info
        name: req.user.name,
        lastname: req.user.lastname,
        departament: departament.name,
        telephone: req.user.telephone,

        // Report info
        ozps: req.body.data.ozps,
        ozpShifts: req.body.data.ozpShifts,
        summ: req.body.data.ozpsSumm,
        moment: moment
      },
      reportLetter = new Etpl(reportTpl),
      mailOptions = {
        from: 'orders@makdoors.ru',
        to: 'dveri74-buh@mail.ru',
        subject: `${req.user.name} ${req.user.lastname} Отчет ОЗП - makdoors.ru`,
        html: ''
      };

      reportLetter
        .render(reportObj)
        .then((result) => {
          mailOptions.html = result.html;
          transporter.sendMail(mailOptions, (error, info) => {
            let msg  = '',
                ss   = {},
                code = 0;

            if(error) {
              code = 504;
              msg  = 'Ошибка при отправке отчета';
              ss   = error;
            } else {
              code = 200;
              msg  = 'Отчет успешно отправлен';
              ss   = info;
            }

            return res.json({
              code: 200,
              msg: msg,
              info: ss
            });
          });
        });
    });
}

exports.edit = (req, res, next) => {
  const id = req.params.id;

  Ozp
    .findById(id)
    .exec((err, ozp) => {
      if(err) { return next(err); }

      return res.render('dashboard/ozp/edit', {
        ozp: ozp
      });
    });
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

exports.update = (req, res, next) => {
  const date = req.body.date.split('.'),
        id   = req.body.id;

  Ozp.update({
    _id: id
  }, {
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

      return res.redirect('/dashboard/ozp');
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
