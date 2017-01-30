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


/*
 * Expos
 */

exports.index = (req, res, next) => {
 const year   = new Date().getFullYear(),
        month = new Date().getMonth() + 1,
        start = new Date(year, month - 1, 1),
        end   = new Date(year, month, 1);

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
          .findOne({
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
        code: 200,
        users: users,
        departaments: departaments,
        ozps: result[2],
        ozpShifts: result[3]
      });
    });
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
        end = new Date(year, month, 1);

  async.parallel([
    function(cb) {
      Ozp
      .find({
        user: req.user.id
      })
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
          departament: req.user.departament,
          date: {
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

    return res.json({
      code: 200,
      ozps: result[0],
      ozpShifts: result[1]
    });
  });
};

exports.filter = (req, res, next) => {
  const month  = Number(req.body.month),
        year   = Number(req.body.year),
        start  = new Date(year, month - 1, 1),
        end    = new Date(year, month, 1);

  let query  = {
    date: {
      $gte: start,
      $lt: end
    }
  };

  if (req.body.user && !!req.body.user.length) {
    query['user'] = req.body.user;
  }

  if (req.body.departament && !!req.body.departament.length) {
    query['departament'] = req.body.departament;
  }

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
          .find(query)
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
    async.parallel([
      function(cb) {
        Ozp
          .find({
            user: req.user.id,
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
          .findOne({
            user: req.user.id,
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

      return res.json({
        code: 200,
        ozps: result[0],
        ozpShifts: result[1]
      });
    });
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
        to: 'dveri74-buh@mail.ru, troinof@yandex.ru',
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

  Ozp
    .update({
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
