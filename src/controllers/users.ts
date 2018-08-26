/**
 * User controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle user( login, logout and etc )
 *
 *
 * Module dependencies
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import passgen from 'password-generator';
import EmailTemplate from 'email-templates';
import email from 'nodemailer';

const Departament = mongoose.model('Departament');
const User = mongoose.model('User');

/*!
 * Expos
 */

export const index = async (_, res) => {
  const [departaments, users] = await Promise.all([
    Departament.find(),
    User.find()
  ]);

  return res.render('dashboard/users/index', {
    departaments,
    users
  });
};

export const create = async (req, res) => {
  const departaments = Departament.find();

  return res.render('dashboard/users/create', {
    departaments
  });
};

export const store = async (req, res) => {
  await User.create({
    name: req.body.name,
    login: req.body.login,
    group: req.body.group,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    departament: req.body.departament
  });

  return res.redirect('/dashboard/users');
};

export const edit = async (req, res) => {
  const id = req.params.id || '';

  const [departaments, user] = await Promise.all([
    Departament.find(),
    User.findById(id)
  ]);

  return res.render('dashboard/users/edit', {
    departaments,
    user
  });
};

export const update = async (req, res) => {
  const { id, name, login, group, lastname, telephone, departament } = req.body;

  await User.update(
    { _id: id },
    {
      name,
      login,
      group,
      lastname,
      telephone,
      departament,
    },
  );

  return res.redirect('/dashboard/users');
};

export const destroy = async (req, res) => {
  const id = req.params.id || '';

  await User.findByIdAndRemove(id);

  return res.redirect('/dashboard/users');
};

export const restore = async (req, res) => {
  const id = req.body.id || '';
  const pass = passgen();
  const transporter = email.createTransport({
    service: 'Yandex',
    auth: {
      user: 'access@makdoors.ru',
      pass: 'makdoors713'
    }
  });
  const restorEmailTemplate = path.join(
    `${__dirname}/../views`,
    'emails',
    'restore'
  );
  const restoreLetter = new EmailTemplate(restorEmailTemplate);
  const mailOptions = {
    from: 'access@makdoors.ru',
    to: 'access@makdoors.ru',
    subject: 'Доступ к сайту - makdoors.ru',
    html: ''
  };

  const user = await User.update(
    { _id: id },
    { password: bcrypt.hashSync(pass, 8) }
  );

  const restoreLetterTemplate = await restoreLetter.render({
    pass,
    user
  });

  mailOptions.html = restoreLetterTemplate.html;

  await transporter.sendMail(mailOptions);

  return res.json({
    code: 200
  });
};

export const login = (req, res) => res.render('user/login');

export const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
