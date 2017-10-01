/**
 * User controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle user( login, logout and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const passgen = require('password-generator');
const Etpl = require('email-templates').EmailTemplate;
const email = require('nodemailer');

const Departament = mongoose.model('Departament');
const User = mongoose.model('User');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const [departaments, users] = await Promise.all([
    Departament.find(),
    User.find(),
  ]);

  return res.render('dashboard/users/index', {
    departaments,
    users,
  });
};

exports.create = async (req, res) => {
  const departaments = Departament.find();

  return res.render('dashboard/users/create', {
    departaments,
  });
};

exports.store = async (req, res) => {
  await User.create({
    name: req.body.name,
    login: req.body.login,
    group: req.body.group,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    departament: req.body.departament,
  });

  return res.redirect('/dashboard/users');
};

exports.edit = async (req, res) => {
  const id = req.params.id || '';

  const [departaments, user] = await Promise.all([
    Departament.find(),
    User.findById(id),
  ]);

  return res.render('dashboard/users/edit', {
    departaments,
    user,
  });
};

exports.update = async (req, res) => {
  const id = req.body.id || '';

  await User.update({
    _id: id,
  }, {
    name: req.body.name,
    login: req.body.login,
    group: req.body.group,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    departament: req.body.departament,
  });

  return res.redirect('/dashboard/users');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await User.findByIdAndRemove(id);

  return res.redirect('/dashboard/users');
};

exports.restore = async (req, res) => {
  const id = req.body.id || '';
  const pass = passgen();
  const transporter = email.createTransport({
    service: 'Yandex',
    auth: {
      user: 'access@makdoors.ru',
      pass: 'makdoors713',
    },
  });
  const restoreTpl = path.join(`${__dirname}/../views`, 'emails', 'restore');
  const restoreLetter = new Etpl(restoreTpl);
  const mailOptions = {
    from: 'access@makdoors.ru',
    to: 'access@makdoors.ru',
    subject: 'Доступ к сайту - makdoors.ru',
    html: '',
  };

  const user = await User.update({ _id: id }, { password: bcrypt.hashSync(pass, 8) });

  const restoreLetterTemplate = await restoreLetter.render({
    pass,
    user,
  });

  mailOptions.html = restoreLetterTemplate.html;

  await transporter.sendMail(mailOptions);

  return res.json({
    code: 200,
  });
};

exports.login = (req, res) => res.render('user/login');

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
