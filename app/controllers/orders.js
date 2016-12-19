'use strict';

/**
 * Order controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Order ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose       = require('mongoose'),
      async          = require('async'),
      path           = require('path'),
      Etpl           = require('email-templates').EmailTemplate,
      email          = require('nodemailer'),
      Product        = mongoose.model('Product'),
      Departament    = mongoose.model('Departament'),
      Attribute      = mongoose.model('Attribute'),
      AttributeGroup = mongoose.model('AttributeGroup'),
      User           = mongoose.model('User'),
      Order          = mongoose.model('Order');

/*!
 * Expos
 */


/**
 * Order list
 */

exports.index = (req, res, next) => {
  const searchObj = req.user.group === 'manager' ? {} : { user: req.user._id };

  async.parallel([
    function(cb) {
     Order
      .find(searchObj)
      .sort({
        createdAt: -1
      })
      .exec(function(err, orders) {
        return cb(err, orders);
      });
    },
    function(cb) {
      User
        .find()
        .exec((err, users) => {
          return cb(err, users);
        });
    },
  ], function(err, result) {
    if (err) { return next(err); }

    let users = {};

    if (Array.isArray(result[1]) && Boolean(result[1].length)) {
      result[1].forEach(function(user) {
        users[user.id] = user.name;
      });
    }

    if (Array.isArray(result[0]) && Boolean(result[0].length)) {
      return res.render('dashboard/orders/index', {
        orders: result[0],
        users: users
      });
    }

    return res.render('dashboard/orders/index');
  });
};


exports.show = (req, res, next) => {
  const id = req.params.id || '';

  async.parallel([
    (cb) => {
      Order
        .findById(id)
        .exec((err, order) => {
          return cb(err, order);
        });
    },
    (cb) => {
      User
        .find()
        .exec((err, users) => {
          return cb(err, users);
        });
    }
  ], function(err, result) {
    if (err) { return next(err); }

    if (Array.isArray(result[1]) && Boolean(result[1].length)) {
      result[1].forEach((user) => {
        if (String(user._id) === result[0].user) { result[0].user = user.name; }
      });
    }

    if (result[0]) { return res.render('dashboard/orders/show', result[0]); }

    return res.render('dashboard/orders/index');
  });
};

exports.create = (req, res, next) => {
  async.parallel([
    function(cb) {
      Product
        .find()
        .exec((err, products) => {
          cb(err, products);
        });
    },
    function(cb) {
      Departament
        .find()
        .exec((err, departaments) => {
          cb(err, departaments);
        });
    }
  ], function(err, result) {
    if (err) { return next(err); }

    let _departament = [];

    if (Array.isArray(result[1]) && !!result[1].length) {
      result[1].forEach(function(departament) {
        if (req.user.departament === departament.id) {
          _departament = departament;
        }
      });
    }

    return res.render('dashboard/orders/create', {
      products: result[0],
      departament: _departament
    });
  });
};

exports.store = (req, res, next) => {
  let transporter = email.createTransport({
      service: 'Yandex',
      auth: {
          user: 'orders@makdoors.ru',
          pass: 'qrj7tw43bt'
      }
  }),
  departamentEmails = {
    'mr.makdoors@mail.ru, orders@makdoors.ru': [
      '5819971b4bebf14032fc1b3d',
      '581997714bebf14032fc1b3e',
      '581997e54bebf14032fc1b40',
      '581998354bebf14032fc1b41',
      '581998664bebf14032fc1b42',
      '5819989f4bebf14032fc1b44',
      '582a92c16c09946b8c36469c'
    ],
    'pryahinaa@list.ru, dveri74-buh@mail.ru, orders@makdoors.ru': [
      '5819991b4bebf14032fc1b46',
      '5822bbcc83abe41b9f451c03'
    ],
    'pryahinaa@list.ru, orders@makdoors.ru': [
      '5819979e4bebf14032fc1b3f',
      '581998ee4bebf14032fc1b45'
    ]
  },
  orderEmail = 'mr.makdoors@mail.ru',
  orderTpl = path.join(`${__dirname}/../views`, 'emails', 'order'),
  orderObj = {
    // Seller info
    departament: req.body.departament,
    user: req.user._id,
    product: req.body.product,
    productID: req.body.productID,
    discount: req.body.discount,
    deliveryPrice: req.body.deliveryPrice,

    // Bayer info
    fio: req.body.fio,
    address: req.body.address,
    telephone: req.body.telephone,
    manufactureDate: req.body.manufactureDate,
    deliveryDate: req.body.deliveryDate,
    comment: req.body.comment,

    // Order info
    doors: req.body.doors,
    pagonazsh: req.body.pagonazsh,
    furnityra: req.body.furnityra,
    arki: req.body.arki,

    // Balance
    balance: req.body.balance,
    prepay: req.body.prepay
  },
  orderLetter = new Etpl(orderTpl);

  Order.create(orderObj, (err, order) => {
    if (err) { return next(err); }

    for(let email in departamentEmails) {
      if (departamentEmails[email].indexOf(orderObj.productID) !== -1) { orderEmail = email; }
    }

    let mailOptions = {
      from: 'orders@makdoors.ru',
        to: orderEmail,
        subject: 'Заказ с сайта - makdoors.ru',
        html: ''
    };

    orderObj.user = req.user.name;

    orderLetter
      .render(orderObj)
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
      code: 200,
      order: order
    });
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Order
    .findById(id)
    .exec((err, order) => {
      if (err) { return next(err); }

      if (Order) { return res.render('dashboard/orders/edit', { Order: Order }); }

      return res.redirect('/dashboard/orders');
    });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Order
    .findByIdAndRemove(id)
    .exec((err, order) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/orders');
    });
};

// JSON API
// ----------------------------------------------

exports.info = (req, res, next) => {
  async.parallel([
    (cb) => {
      Product
        .find()
        .exec((err, products) => {
          return cb(err, products);
        });
    },
    (cb) => {
      Attribute
        .find()
        .exec((err, attributes) => {
          return cb(err, attributes);
        });
    },
    (cb) => {
      AttributeGroup
        .find()
        .exec((err, attributeGroups) => {
          return cb(err, attributeGroups);
        });
    }],
    (err, result) => {
      if (err) { return next(err); }

      return res.json({
        products: result[0],
        attributes: result[1],
        attributeGroups: result[2]
      });
  });
};
