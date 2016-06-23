'use strict';

/*!
 * Module variables
 */

let mongoose, Article;

/*!
 * Module dependencies.
 */

mongoose = require('mongoose');
Article = mongoose.model('Article');

exports.index = function(req, res, next) {
    Article
        .find((err, articles) => {
            if (err) {
                return next(err);
            }

            console.info(articles);

            res.render('home/index', {
                title: 'Node Express Mongoose Boilerplate',
                articles: articles
            });
        })
};