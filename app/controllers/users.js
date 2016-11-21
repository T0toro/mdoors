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

const mongoose    = require('mongoose'),
      bcrypt      = require('bcryptjs'),
      path        = require('path'),
      async       = require('async'),
      passgen     = require('password-generator'),
      Etpl        = require('email-templates').EmailTemplate,
      email       = require('nodemailer'),
      Departament = mongoose.model('Departament'),
      User        = mongoose.model('User');

/*!
 * Expos
 */

exports.index = (req, res, next) => {
  async.parallel([
    (cb) => {
      Departament
        .find()
        .exec((err, departaments) => {
          return cb(err, departaments);
        });
    },
    (cb) => {
      User
        .find()
        .exec((err, users) => {
          return cb(err, users);
        });
    }], (err, result) => {
      if (err) { return next(err); }

      return res.render('dashboard/users/index', {
        departaments: result[0],
        users: result[1]
      });
    });
};

exports.create  = (req, res, next) => {
  Departament
    .find()
    .exec((err, departaments) => {

      return res.render('dashboard/users/create', {
        departaments: departaments
      });
    });
}

exports.store   = (req, res, next) => {
  User.create({
    name: req.body.name,
    login: req.body.login,
    group: req.body.group,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    departament: req.body.departament
  }, (err, user) => {
    if (err) { return next(err) }

    return res.redirect('/dashboard/users');
  });
};

exports.edit    = (req, res, next) => {
  const id = req.params.id || '';

  async.parallel([
    (cb) => {
      Departament
        .find()
        .exec((err, departaments) => {
          return cb(err, departaments);
        });
    },
    (cb) => {
      User
        .findById(id)
        .exec((err, user) => {
          return cb(err, user);
        });
    }], (err, result) => {
      if (err) { return next(err); }

      return res.render('dashboard/users/edit', {
        departaments: result[0],
        user: result[1]
      });
    });
};

exports.update  = (req, res, next) => {
  const id = req.body.id || '';

  User.update({
    _id: id
  }, {
    name: req.body.name,
    login: req.body.login,
    group: req.body.group,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    departament: req.body.departament
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

exports.restore = (req, res, next) => {
  const id = req.body.id || '',
        pass = passgen(),
        transporter = email.createTransport({
          service: 'Yandex',
          auth: {
            user: 'access@makdoors.ru',
            pass: 'x8RhDShCtb3tCf5'
          }
        });
        let restoreTpl = path.join(`${__dirname}/../views`, 'emails', 'restore'),
        restoreLetter = new Etpl(restoreTpl),
        mailOptions = {
          from: 'access@makdoors.ru',
          to: 'access@makdoors.ru',
          subject: 'Доступ к сайту - makdoors.ru',
          html: ''
        };

  async.waterfall([
    (cb) => {
      User
        .find({
          _id: id
        }).exec((err, user) => {
          return cb(err, user);
        });
    },
    (user, cb) => {
      User
        .update({
          _id: id
        }, {
          password: bcrypt.hashSync(pass, 8)
        }).exec((err) => {
          return cb(err, user);
        });
    },
  ], (err, result) => {
    if(err) { return next(err); }

    restoreLetter
      .render({
        user: result[0],
        pass: pass
      })
      .then((result) => {
        mailOptions.html = result.html;
         transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log('Ошибка отправки: ' + error);
            }
            else {
                console.log('Письмо успешно отправлено: ' + info);
                console.info(mailOptions.to);
            }
          });
      });

    return res.json({
      code: 200
    });
  });
};

exports.login = (req, res) => {
  res.render('user/login');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};
