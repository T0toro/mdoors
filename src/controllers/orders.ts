/**
 * Order controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Order ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const path = require('path');
const Etpl = require('email-templates').EmailTemplate;
const email = require('nodemailer');

const Product = mongoose.model('Product');
const Departament = mongoose.model('Departament');
const Attribute = mongoose.model('Attribute');
const AttributeGroup = mongoose.model('AttributeGroup');
const User = mongoose.model('User');
const Order = mongoose.model('Order');

/**
 * Order list
 */

exports.index = (req, res) => res.render('dashboard/orders/index');

// TODO: split to index and paginate
exports.indexJson = async (req, res) => {
  const searchObj = (req.user.group === 'manager' || req.user.group === 'accountant') ? {} : { user: req.user._id };
  const page = req.query.page || 0;
  const limit = 8;

  const [orders, records, users] = await Promise.all([
    Order.find(searchObj).skip(page * limit).limit(limit).sort({ createdAt: -1 }),
    Order.count(),
    User.find(),
  ]);

  const usersHash = {};

  users.forEach((user) => {
    usersHash[user.id] = user.name;
  });

  return res.json({
    orders,
    records,
    users: usersHash,
    access: req.user.group,
  });
};

exports.show = async (req, res) => {
  const id = req.params.id || '';

  const [users, order] = await Promise.all([
    User.find(),
    Order.findById(id),
  ]);


  users.forEach((user) => {
    if (String(user._id) === order.user) { order.user = user.name; }
  });

  return res.render('dashboard/orders/show', order);
};

exports.create = async (req, res) => {
  const [products, departaments] = await Promise.all([
    Product.find(),
    Departament.find(),
  ]);

  const departament = departaments.find(departamentItem => req.user.departament === departamentItem.id);

  return res.render('dashboard/orders/create', {
    products,
    departament,
  });
};

exports.store = async (req, res) => {
  const transporter = email.createTransport({
    service: 'Yandex',
    auth: {
      user: 'orders@makdoors.ru',
      pass: 'qrj7tw43bt',
    },
  });

  const departamentEmails = {
    'mr.makdoors@mail.ru, orders@makdoors.ru': [
      '5819971b4bebf14032fc1b3d',
      '581997714bebf14032fc1b3e',
      '581997e54bebf14032fc1b40',
      '581998354bebf14032fc1b41',
      '581998664bebf14032fc1b42',
      '5819989f4bebf14032fc1b44',
      '582a92c16c09946b8c36469c',
    ],
    'vdmakdoors@mail.ru, dveri74-buh@mail.ru, orders@makdoors.ru': [
      '5819991b4bebf14032fc1b46',
      '5822bbcc83abe41b9f451c03',
    ],
    'vdmakdoors@mail.ru, orders@makdoors.ru': [
      '5819979e4bebf14032fc1b3f',
      '581998ee4bebf14032fc1b45',
    ],
  };

  const orderTpl = path.join(`${__dirname}/../views`, 'emails', 'order');
  const orderObj = {
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
    prepay: req.body.prepay,
  };

  const orderLetter = new Etpl(orderTpl);
  const order = await Order.create(orderObj);

  let orderEmail = 'mr.makdoors@mail.ru';

  Object.keys(departamentEmails).forEach((mail) => {
    if (departamentEmails[mail].indexOf(orderObj.productID) !== -1) { orderEmail = mail; }
  });

  const mailOptions = {
    from: 'orders@makdoors.ru',
    to: orderEmail,
    subject: 'Заказ с сайта - makdoors.ru',
    html: '',
  };

  orderObj.user = req.user.name;

  const emailTemplate = await orderLetter.render(orderObj);

  mailOptions.html = emailTemplate.html;

  // Send email
  transporter.sendMail(mailOptions).then((err) => {
    if (!err) {
      order.status = 2;
      order.save();
    } else {
      order.status = 1;
      order.save();
    }
  });

  return res.json({
    order,
    code: 200,
  });
};

exports.edit = async (req, res) => {
  const id = req.params.id || '';

  const order = Order.findById(id);

  res.render('dashboard/orders/edit', { order });
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  if (req.user.group !== 'accountant') {
    return res.json({
      code: 403,
      msg: 'У вас нет прав для выполнения данного действия',
    });
  }

  await Order.findByIdAndRemove(id);

  return res.redirect('/dashboard/orders');
};

// JSON API
// ----------------------------------------------

exports.info = async (req, res) => {
  const [attributeGroups, attributes, products] = await Promise.all([
    AttributeGroup.find(),
    Attribute.find(),
    Product.find(),
  ]);

  return res.json({
    attributeGroups,
    attributes,
    products,
  });
};
