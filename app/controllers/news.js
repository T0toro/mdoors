/**
 * News controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle News ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');

const News = mongoose.model('News');

/*
 * Expos
 */


/**
 * News list
 */

exports.index = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });

  return res.render('dashboard/news/index', { news });
};

exports.create = (req, res) => res.render('dashboard/news/create');

exports.store = (req, res, next) => {
  News.create({
    name: req.body.name,
    thumb: req.body.thumb,
    content: req.body.content,
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/news');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  News
    .findById(id)
    .exec((err, news) => {
      if (err) { return next(err); }

      if (news) { return res.render('dashboard/news/edit', { news }); }

      return res.redirect('/dashboard/news');
    });
};

exports.update = async (req, res) => {
  const id = req.body.id || '';

  await News.update({ _id: id }, {
    name: req.body.name,
    thumb: req.body.thumb,
    content: req.body.content,
  });

  return res.redirect('/dashboard/news');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await News.findByIdAndRemove(id);

  return res.redirect('/dashboard/news');
};
