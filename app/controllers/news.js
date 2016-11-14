'use strict';

/**
 * News controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle News ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      moment   = require('moment'),
      News = mongoose.model('News');

/*
 * Expos
 */


/**
 * News list
 */

exports.index = (req, res, next) => {
  News
    .find()
    .exec((err, news) => {
      if (err) { return next(err); }

      if (Array.isArray(news)) {
        return res.render('dashboard/news/index', { news: news });
      }

      return res.render('dashboard/news/index');
    });
};

exports.create = (req, res) => res.render('dashboard/news/create');

exports.store = (req, res, next) => {
  News.create({
    name: req.body.name,
    thumb: req.body.thumb,
    content: req.body.content
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

      if (news) { return res.render('dashboard/news/edit', { news: news }); }

      return res.redirect('/dashboard/news');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  News.update({ _id: id }, {
    name: req.body.name,
    thumb: req.body.thumb,
    content: req.body.content
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/news');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  News
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/news');
    });
};
