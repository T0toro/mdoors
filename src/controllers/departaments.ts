/**
 * Departament controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle departament( login, logout and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');

const Departament = mongoose.model('Departament');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const departaments = await Departament.find();

  return res.render('dashboard/departaments/index', { departaments });
};

exports.create = (req, res) => res.render('dashboard/departaments/create');

exports.store = async (req, res) => {
  await Departament.create({
    name: req.body.name,
    address: req.body.address,
    telephone: req.body.telephone,
  });

  return res.redirect('/dashboard/departaments');
};

exports.edit = async (req, res) => {
  const id = req.params.id || '';

  const departament = await Departament.findById(id);

  return res.render('dashboard/departaments/edit', { departament });
};

exports.update = async (req, res) => {
  const id = req.body.id || '';

  Departament.update({
    _id: id,
  }, {
    name: req.body.name,
    address: req.body.address,
    telephone: req.body.telephone,
  });

  return res.redirect('/dashboard/departaments');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await Departament.findByIdAndRemove(id);

  return res.redirect('/dashboard/departaments');
};
